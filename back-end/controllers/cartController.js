const Cart = require("../models/cartModel");
const baseController = require("./baseController");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { default: mongoose } = require("mongoose");

//exports.getAllCart = baseController.getAll(Cart);
exports.getCart = baseController.getOne(Cart);
exports.createCart = baseController.createOne(Cart);
exports.updateCart = baseController.updateOne(Cart);
exports.deleteCart = baseController.deleteOne(Cart);

exports.addToCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.user.cart[0]._id);
  let quantity = req.body.quantity;

  if (!cart) {
    return next(new AppError("No cart found with that ID", 404));
  }

  const oldProducts = [...cart.products];

  const existingIndex = oldProducts.findIndex(
    (x) => x.productId.toString() === req.body.productId
  );

  if (existingIndex !== -1) {
    oldProducts[existingIndex].quantity += quantity;
  } else {
    oldProducts.push({ productId: req.body.productId, quantity });
  }

  const doc = await Cart.findByIdAndUpdate(
    cart._id,
    { products: oldProducts },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(201).json({
    status: "success",
    data: { data: doc },
  });
});

exports.removeFromCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.user.cart[0]._id);

  if (!cart) {
    return next(new AppError("No cart found with that ID", 404));
  }

  const updatedProducts = cart.products.filter(
    (x) => x.productId.toString() !== req.body.productId
  );

  const doc = await Cart.findByIdAndUpdate(
    cart._id,
    { products: updatedProducts },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { data: doc },
  });
});

exports.getAllCart = catchAsync(async (req, res, next) => {
  let query = Cart.find().select("-__v").populate("products.productId");

  const docs = await query;

  let totalPrice = 0;

  for (const doc of docs) {
    if (doc.products) {
      for (const item of doc.products) {
        const price = item.productId.price;
        const quantity = item.quantity;

        totalPrice += price * quantity;
      }
    }
  }

  res.status(200).json({
    status: "success",
    results: docs.length,
    totalPrice,
    data: { data: docs },
  });
});

exports.calculateTotalCartPrice = async (cartId) => {
  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    throw new AppError("No cart found with that ID", 404);
  }

  const cart = await Cart.findById(cartId).populate("products.productId");

  if (!cart) {
    throw new AppError("No cart found with that ID", 401);
  }

  let totalPrice = 0;

  if (cart.products && cart.products.length > 0) {
    for (const item of cart.products) {
      if (item.productId) {
        const price = item.productId.price;
        const quantity = item.quantity;
        totalPrice += price * quantity;
      }
    }
  }

  return totalPrice;
};

exports.getMyCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.user.cart[0]._id).populate(
    "products.productId"
  );

  if (!cart) {
    return next(new AppError("Cart for this user does not exist"), 401);
  }

  const totalPrice = await this.calculateTotalCartPrice(cart._id);

  for (const item of cart.products) {
    if (item.productId) {
      item.price = item.productId.price * item.quantity;
    }
  }

  res.status(200).json({
    status: "success",
    data: { data: cart },
    totalPrice,
  });
});
