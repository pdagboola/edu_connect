require("dotenv").config();
const { Router } = require("express");
const route = Router();
const askQuestion = require("../controllers/questionsController");
const passport = require("../middlewares/auth");

route.use(passport.authenticate("jwt", { session: false }));
route.post("/", askQuestion);

module.exports = route;
