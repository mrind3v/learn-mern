const express = require("express");
const mongoose = require("mongoose");

const PORT = 8000;
// we can specify name of our database after "/" and before "?" signs
const mongodbConnectionString =
  "mongodb+srv://mrind3v:max@cluster0.5r2z44c.mongodb.net/social?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
app.use(express.json());

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

// 2. next we will create collection in the database. We create Model to create collections
// it means - "I want to create a 'products' collection that will follow 'productSchema'"
let ProductModel = mongoose.model("products", productSchema);

// 3. now actually creating a document (an actual product) in the products collection using POST req
app.post("/api/products", async (req, res) => {
  const body = req.body;
  // to actually save the json body sent in POST req in the DB
  // .create() is an async function as we're communicating with an external resource (DB here)
  await ProductModel.create({
    productName: body.productName,
    productPrice: body.productPrice,
    isInStock: body.isInStock,
    category: body.category,
    // can pass entire body also
  });

  res.status(201).json({ message: "product created successfully" });
});

app.get("/api/products", (req, res) => {
  res.send("Server ON...");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
