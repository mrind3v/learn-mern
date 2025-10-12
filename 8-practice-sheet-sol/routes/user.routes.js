const express = require("express"); 
const { getUser, getAllUsers } = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("/users/:id", getUser);
userRouter.get("/users", getAllUsers);

module.exports = userRouter;