const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Person = new Schema(
  {
    name: { type: String, required: true, maxLength: 20, minLength: 2 },
    phone: {
      type: String,
      unique: true,
      required: true,
      maxLength: 11,
      minLength: 10,
    },
    image: {type: String, default: "https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg"},
    address: { type: String, default: "Ha noi", maxLength: 50 },
    password: { type: String, required: true, minLength: 1 },
    fmcToken: { type: String, default: "123" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("client", Person);
