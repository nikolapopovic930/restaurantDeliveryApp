const Order = require("../models/orderModel");
const baseController = require("./baseController");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const sendEmail = require("../utils/email");
const Cart = require("../models/cartModel");
const { default: mongoose, overwriteMiddlewareResult } = require("mongoose");
const cartController = require("./cartController");

exports.getAllOrder = baseController.getAll(Order);
exports.getOrder = baseController.getOne(Order);
exports.createOrder = baseController.createOne(Order);
exports.updateOrder = baseController.updateOne(Order);
exports.deleteOrder = baseController.deleteOne(Order);

exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  if (!req.body.status) {
    return next(new AppError("New status is required field", 400));
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  if (order.status !== "pending") {
    return next(
      new AppError(
        `${order.status.charAt(0).toUpperCase()}${order.status.slice(
          1
        )} order can not be changed`,
        400
      )
    );
  }

  const cart = await Cart.findById(order.cartId);
  if (!cart) {
    return next(new AppError(`No cart found for order ${order._id} `, 404));
  }

  const user = await User.findById(cart.userId);
  if (!user) {
    return next(new AppError(`No user found for order ${order._id} `, 404));
  }

  const doc = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  let message;

  if (doc.status == "rejected") {
    message = `Dear ${
      user.firstName + " " + user.lastName
    },\n\nUnfortunately your order is ${doc.status}!`;
  } else if (doc.status == "accepted") {
    message = `Dear ${
      user.firstName + " " + user.lastName
    },\n\nWe are happy to inform you that your order is ${doc.status}!`;
  }
  try {
    await sendEmail({
      email: user.email,
      subject: "Order status information",
      message,
    });
  } catch (err) {
    console.log(err);
    return next(
      new AppError(
        "There was an error sending email. Please try again later!",
        500
      )
    );
  }

  res.status(200).json({ status: "success", data: { data: doc } });
});

exports.placeOrder = catchAsync(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (!req.user.cart[0].products || req.user.cart[0].products.length === 0) {
      return next(
        new AppError(
          `You must have products in your cart to place an order!`,
          400
        )
      );
    }

    const order = await Order.create(
      [
        {
          deliveryInfo: {
            address: req.body.deliveryInfo.address,
            city: req.body.deliveryInfo.city,
            country: req.body.deliveryInfo.country,
            phoneNumber: req.body.deliveryInfo.phoneNumber,
            note: req.body.deliveryInfo.note,
          },
          cartId: req.user.cart[0]._id,
        },
      ],
      { session }
    );

    const oldCart = await Cart.findByIdAndUpdate(
      req.user.cart[0]._id,
      { status: "closed" },
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    const newCart = await Cart.create(
      [
        {
          userId: req.user._id,
          status: "active",
          products: [],
        },
      ],
      { session }
    );

    let totalPrice = await cartController.calculateTotalCartPrice(
      req.user.cart[0]._id
    );
    let message = `${totalPrice} uspesno poslat order`;

    try {
      await sendEmail({
        email: req.user.email,
        subject: `Order placement ${order._id}`,
        message,
      });
    } catch (err) {
      console.log(err);
      return next(
        new AppError(
          "There was an error sending email. Please try again later!",
          500
        )
      );
    }

    await session.commitTransaction();

    res.status(201).json({
      status: "success",
      data: {
        order: order,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    return next(new AppError(error), 401);
  } finally {
    session.endSession();
  }
});
