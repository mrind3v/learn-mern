import express from "express";
import isAuth from "../middlewares/isAuth.js";
const userRouter = express.Router();

// define user routes here. 
userRouter.get("/current", isAuth, GetToApp)

export default userRouter;