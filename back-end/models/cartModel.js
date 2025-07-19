const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [
    {
      _id: false,
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["closed", "active"],
    default: "active",
    trim: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
