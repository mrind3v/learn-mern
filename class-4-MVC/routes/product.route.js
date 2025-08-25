// before setting routes, make sure the server is running. We have done this in index.js
const express = require("express");

// we won't use app to initialise express - we simply want to setup routes here. So we use
// something called express router to define routes
const router = express.Router();

// now think of what you will do with your products (the model - Product) when defining routes
// more generally - think of the ways you want to manipulate your model

// /api will be set as default route in index.js - so just write /products, /products/1, etc...
// router.get("/api/products", (req, res) => {
//   res.send("All Products");
// });

router.get("/products", (req, res) => {
  res.send("All Products");
});

module.exports = router;