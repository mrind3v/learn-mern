// before setting routes, make sure the server is running. We have done this in index.js
const express = require("express");
// import model from models folder to manipulate it
const ProductModel = require("../models/product.model.js");

const { createProduct, updateProduct } = require("../controllers/product.controllers.js")

// we won't use app to initialise express - we simply want to setup routes here. So we use
// something called express router to define routes
const router = express.Router();

// now think of what you will do with your products (the model - Product) when defining routes
// more generally - think of the ways you want to manipulate your model

// /api will be set as default route in index.js - so just write /products, /products/1, etc... 
// in routes in the routes folder
// router.get("/api/products", (req, res) => {
//   res.send("All Products");
// });

// since we are interacting with an external device here (database), it should be an async fn
router.get("/getProducts", async (req, res) => {
  let products = await ProductModel.find({});
  res.send(products);
});
// always come to routes after creating model (which is the 1st task), then write 
// dummy function names with different routes. The create the actual functions in 
// controllers folder (inside controllers, make sure to import the model), export
// those functions, import em into routes and use em inside routes. also export the
// router from routes and import in index.js
router.post("/createProduct", createProduct);
router.put("/updateProduct",updateProduct);

module.exports = router;
