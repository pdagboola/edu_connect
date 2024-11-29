const { Router } = require("express");
const {
  registerUserPost,
  loginUserPost,
} = require("../controllers/userController");
const route = Router();

route.post("/register", registerUserPost);
route.post("/login", loginUserPost);

module.exports = route;
