const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "User must have a first name."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "User must have a last name."],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "User must have a username."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "User must have a password."],
      trim: true,
      minLength: [8, "Password must be atleast 8 characters long."],
      validate: {
        validator: function (value) {
          return /[A-Z]/.test(value);
        },
        message: "Password must contain at least one uppercase letter.",
      },
      select: false,
    },
    birthDate: {
      type: Date,
      required: [true, "User must have a birth date."],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "User must have a city."],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "User must have a country."],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "User must have a adress."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User must have a email."],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "User must have a phone number."],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: [true, "User must have a role."],
      default: "user",
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

userSchema.virtual("cart", {
  ref: "Cart",
  foreignField: "userId",
  localField: "_id",
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.isCorrectPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
