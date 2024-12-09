const { Router } = require("express");
const route = Router();
const {
  facebookCallback,
  facebookLogin,
} = require("../controllers/facebookController");
const {
  googleCallback,
  googleLogin,
} = require("../controllers/googleController");

route.get("/facebook", facebookLogin);
route.get("/facebook/callback", facebookCallback);
route.get("/google", googleLogin);
route.get("/google/callback", googleCallback);

module.exports = route;
