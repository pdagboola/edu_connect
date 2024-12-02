require("dotenv").config();
const { Router } = require("express");
const route = Router();
const {
  askQuestion,
  allQuestions,
  questionsByUser,
} = require("../controllers/questionsController");
const passport = require("../middlewares/authMiddleware");

route.use(passport.authenticate("jwt", { session: false }));
route.get("/", allQuestions);
route.get("/:id", questionsByUser);
route.post("/", askQuestion);

module.exports = route;
