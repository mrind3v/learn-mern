const express = require("express");
const { getUsers } = require("../controllers/user.controllers.js");

const router = express.Router();

router.get("/getUsers", getUsers);

module.exports = router;
