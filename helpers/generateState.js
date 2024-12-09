const crypto = require("crypto");

const generateState = () => {
  return crypto.randomBytes(16).toString("hex");
};

module.exports = generateState;
