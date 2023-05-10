const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String, unique: true, required: true},
    image: { type: Array, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true},
    color: { type: Array, require: true},
    description :{ type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("product", Product);
