const mongoose = require("mongoose");

async function connectMongoDb(connURL) {
  return mongoose
    .connect(connURL)
    .then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  connectMongoDb,
};
