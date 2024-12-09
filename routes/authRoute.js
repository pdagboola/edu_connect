const { Router } = require("express");
const route = Router();
const facebookController = require("../controllers/facebookController");
const {
  googleCallback,
  googleLogin,
} = require("../controllers/googleController");

route.get("/facebook", facebookController);
route.get("/google", googleLogin);
route.get("/google/callback", googleCallback);

module.exports = route;
