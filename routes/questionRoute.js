require("dotenv").config({ path: "../config/.env" });
const { Router } = require("express");
const route = Router();
const {
  askQuestion,
  allQuestions,
  questionsById,
} = require("../controllers/questionsController");
const passport = require("../auth/passport");

route.use(passport.authenticate("jwt", { session: false }));
route.get("/", allQuestions);
route.get("/:id", questionsById);
route.post("/", askQuestion);

module.exports = route;
