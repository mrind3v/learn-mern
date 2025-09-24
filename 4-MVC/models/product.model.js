// Keep only the schema and model in this model file

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },

  productPrice: {
    type: String,
    required: true,
  },

  isInStock: {
    type: Boolean,
    required: true,
  },

  category: {
    type: String,
  },
});

let ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;