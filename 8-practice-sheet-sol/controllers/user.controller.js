const Users = require("../data/users");

const getAllUsers = (req, res) => {
  res.json(Users);
};

const getUser = (req, res) => {
  const user = Users.find((user) => user.id == req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

module.exports = {
  getUser,
  getAllUsers,
};
