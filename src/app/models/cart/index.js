const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    productName: { type: String, required: true },
    productImage: { type: String, required: true },
    productRam: { type: String, required: true },
    productColor: { type: String, required: true },
    productQuantity: { type: String, required: true },
    productPrice: { type: String, required: true },
    userId: { type: String, required: true },
    deleteAt:{type: String, default: ''}
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", Cart);
