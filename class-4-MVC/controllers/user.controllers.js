const UserModel = require("../models/user.model.js")

function getUsers(req,res){
    res.send("All Users");
}

module.exports = {
    getUsers,
}