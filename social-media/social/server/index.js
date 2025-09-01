// create server -> database -> build features

import express from "express";
import dotenv from "dotenv";
dotenv.config(); // without dotenv, variables insides .env can't be processes/used import mongoose from "mongoose";    
import connectDB from "./config/db.js";
const PORT = 8080;
const app = express();

connectDB(); // connect to database

app.use(express.json());

// basic route - GET
app.get("/", (req, res) => {
  res.send("Welcome to Social Media API");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
