const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor adcionar um nome"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Por favor adcionar uma categoria"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Por favor adcionar uma marca"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Por favor adcionar um cor"],
      default: "Como visto",
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Por favor adcionar uma quantidade"],
      trim: true,
    },
    sold: {
      type: Number,
      default: 0,
      trim: true,
    },
    regularPrice: {
      type: Number,

      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Por favor adcionar um preço"],
      trim: true,
    },
    description: {
      type: Object,
      // required: [true, "Por favor adcionar uma descrição"],
      // trim: true,
    },
    images: {
      type: [String],
    },
    ratings: {
      type: [Object],
    },
  },
  {
    timstamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
