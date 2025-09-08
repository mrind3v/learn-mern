import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser } from "../controllers/user.controllers.js";
const userRouter = express.Router();

// define user routes here. 
userRouter.get("/current", isAuth, getCurrentUser)

export default userRouter;