//Schema
const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, min: [0, "Invalid Price"], required: true },
  discountPercentage: {
    type: Number,
    min: [0, "Invalid discount(less than 0)"],
    max: [50, "Invalid Discount"],
  },
  rating: {
    type: Number,
    min: [0, "Invalid rating(less than 0)"],
    max: [5, "Invalid Discount(more than 5)"],
    default: 0,
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [String],
});

//model
exports.Product = mongoose.model("Product", productSchema);
