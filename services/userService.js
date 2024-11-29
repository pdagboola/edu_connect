const { getUserByEmail } = require("../models/userModel");

const checkIfUserExists = async (email) => {
  const user = await getUserByEmail(email);
  return user.length !== 0;
};

module.exports = checkIfUserExists;
