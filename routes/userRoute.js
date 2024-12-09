const { Router } = require("express");
const {
  registerUserPost,
  loginUserPost,
} = require("../controllers/userController");
const userCreateSchema = require("../schemas/userSchema/createUserSchema");
const userLoginSchema = require("../schemas/userSchema/loginUserSchema");
const resultErrorMiddleware = require("../middlewares/resultErrorMiddleware");
const { questionsByUser } = require("../controllers/questionsController");

const route = Router();

route.get("/question", questionsByUser);
route.post(
  "/signup",
  resultErrorMiddleware(userCreateSchema),
  registerUserPost
);
route.post("/login", resultErrorMiddleware(userLoginSchema), loginUserPost);

module.exports = route;
