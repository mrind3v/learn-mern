const express = require("express") 
const getProduct = require("../controllers/product.controller.js")
const productRouter = express.Router(); 

productRouter.get("/:id", getProduct);

module.exports = productRouter;