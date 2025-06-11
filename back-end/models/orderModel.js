const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["pending", "rejected", "accepted"],
    default: "pending",
    trim: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: [true, "Order must have a cart ID."],
  },
  deliveryInfo: {
    adress: {
      type: String,
      required: [true, "Delivery info must have an adress."],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "Delivery info must have a city."],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Delivery info must have a country."],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Delivery info must have a phone number."],
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
