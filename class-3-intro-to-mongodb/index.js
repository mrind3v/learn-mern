const express = require("express");
const mongoose = require("mongoose");

const PORT = 8000;
// we can specify name of our database after "/" and before "?" signs
const mongodbConnectionString =
  "mongodb+srv://mrind3v:max@cluster0.5r2z44c.mongodb.net/social?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

mongoose
  .connect(mongodbConnectionString)
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.error("Cannot Connect"); // mongoose.connect() is a promisified fn
  });

// will create a schema
let productSchema = new mongoose.Schema({
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

// 2. next we will create collections in the database. We create Model to create collections
// it means - "I want to create a 'products' collection that will follow 'productSchema'"
let ProductModel = mongoose.model("products", productSchema);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
