const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User"
    },
    products: [
      {
        productId: String,
        productAvatar: String,
        name: String,
        price: Number,
        quantity: Number
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('cart', CartSchema);