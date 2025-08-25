const express = require("express");
require("dotenv").config(); // without dotenv, variables insides .env can't be processes/used

// we will use destructuring "{ }" to take functions from the file connection.js
const { connectMongoDb } = require("./connection.js");

const PORT = 8080;

const app = express();

app.use(express.json());

// username and pass is in the url. To refrain from exposing the data. we will use
// the .env file which won't be pushed to github. To handle env variables, we need a package
// called dotenv - otherwise connectMongoDb expects a string but gets something that is not a string
// but a env variable
connectMongoDb(process.env.connURL);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
