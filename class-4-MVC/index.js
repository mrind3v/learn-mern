const express = require("express");
require("dotenv").config(); // without dotenv, variables insides .env can't be processes/used
// we will use destructuring "{ }" to take functions from the file connection.js
const { connectMongoDb } = require("./connection.js");
// routes (here productRoutes) is an external file. whenever we want to use external files, we make
// use of app.use() function.
const productRoutes = require("./routes/product.route.js"); // routes is in the same folder as index.js
const { populate } = require("dotenv");

const PORT = 8080;

const app = express();

app.use(express.json());

// default route with respect to which all other routes will be defined
app.use("/api", productRoutes);

app.get("/", (req,res)=>{
  res.send("Welcome Aboard!")
})

// username and pass is in the connection URL itself which is a security risk. To refrain from
// exposing the data. we will use the .env file which won't be pushed to github. To handle env
// variables, we need a package called dotenv - otherwise connectMongoDb expects a string but gets
// something that is not a string (doesn't know how to interpret .env variables)
connectMongoDb(process.env.connURL);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

// 1. before creating controllers, routes etc. -> make models first
