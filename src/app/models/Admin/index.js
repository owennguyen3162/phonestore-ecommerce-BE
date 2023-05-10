const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Admin = new Schema(
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
    password: { type: String, required: true, minLength: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("admin", Admin);
