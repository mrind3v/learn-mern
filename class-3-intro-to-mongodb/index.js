const express = require("express");
const mongoose = require("mongoose");

const PORT = 8000;
const mongodb_connection_string =
"mongodb+srv://mrind3v:max@cluster0.5r2z44c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

mongoose
  .connect(mongodb_connection_string)
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.error("Cannot Connect"); // mongoose.connect() is a promisified fn
  });


app.listen(8000, ()=>{
    console.log(`Server running on PORT: ${PORT}`)
})
