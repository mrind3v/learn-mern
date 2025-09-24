// Keep only the schema and model in this model file

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  gender: {
    type: Boolean,
    required: true,
  },

  category: {
    type: String,
  },
});

let UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;