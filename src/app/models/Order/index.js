const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema(
  // {
  //   cartId: { type: String, required: true },
  //   userId: { type: String, required: true },
  //   quantity: { type: Number, required: true },
  //   productName: { type: String, required: true },
  //   productPrice: { type: Number, required: true },
  //   intoMoney: { type: Number, required: true },
  //   address: { type: String, required: true },
  //   color: { type: String, required: true },
  //   productImage: { type: String, required: true },
  //   productRam: { type: String, required: true },
  //   shipping: { type: Number, required: true },
  //   status: { type: String, default: "wait for confirmation" },
  // },
  {
    item: { type: Array, required: true },
    shipping: { type: Number, required: true },
    userId: { type: String, required: true },
    status: { type: String, default: "unconfimred" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", Order);
