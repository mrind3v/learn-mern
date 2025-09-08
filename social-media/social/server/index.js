// create server -> connect database -> build features
// authorization - what part of the app can a user access
// authentication - is the user who they say they are
import express from "express";
// without cookie-parser, we won't be able to read cookies in the request object
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
dotenv.config(); // without dotenv, variables inside .env can't be processes/used import mongoose from "mongoose";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";
const PORT = 8080;

const app = express();

connectDB(); // connect to database

app.use(express.json());
// default route for auth
app.use("/api/auth", authRouter); // http://localhost:8080/api/auth/signup
app.use("/api/user", userRouter)
app.use(cors({
  origin: "http://localhost:5173", // allow this origin(client) to access the server
  credentials: true, // allow cookies to be sent with requests
}))
app.use(cookieParser());



// basic route - GET
app.get("/", (req, res) => {
  res.send("Welcome to Social Media API");
});


app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
