const { getAllUsers } = require("../models/userModel");

const allUsers = async (req, res, next) => {
  const users = await getAllUsers();
  res.status(200).json({ success: true, data: users });
};

module.exports = allUsers;
