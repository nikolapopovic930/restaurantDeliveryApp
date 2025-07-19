const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const util = require("util");
const mongoose = require("mongoose");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newUser = await User.create(
      [
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          password: req.body.password,
          birthDate: req.body.birthDate,
          city: req.body.city,
          country: req.body.country,
          address: req.body.address,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
        },
      ],
      { session }
    );

    const newCart = await Cart.create(
      [
        {
          userId: newUser[0]._id,
          status: "active",
          products: [],
        },
      ],
      { session }
    );

    const token = signToken(newUser._id);

    await session.commitTransaction();

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    return next(new AppError(error), 401);
  } finally {
    session.endSession();
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Please provide username and password", 400));
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(new AppError("Incorrect username or password"), 401);
  }

  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
    userId: user._id,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token || token === "undefined") {
    return next(
      new AppError("User is not logged in. Please log in to get access.", 401)
    );
  }

  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findById(decoded.id).populate({
    path: "cart",
    match: { status: "active" },
  });

  if (!user) {
    return next(
      new AppError("The user with this token no longer exists.", 401)
    );
  }

  req.user = user;
  next();
});

exports.allowedFor = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`You don't have permission for this action`, 403)
      );
    }

    next();
  };
};
