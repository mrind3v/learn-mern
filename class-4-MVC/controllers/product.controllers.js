const ProductModel = require("../models/product.model.js");


async function createProduct(req, res) {
  const body = req.body;
  // to actually save the json body (sent in POST req by user) in the DB
  // .create() is an async function as we're communicating with an external resource (DB here)
  await ProductModel.create({
    productName: body.productName,
    productPrice: body.productPrice,
    isInStock: body.isInStock,
    category: body.category,
    // can pass entire body also
  });

  res.status(201).json({ message: "product created successfully" });
}

async function updateProduct(req,res){
    
}

module.exports = {
    createProduct,
    updateProduct,
}


