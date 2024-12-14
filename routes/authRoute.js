const { Router } = require("express");
const route = Router();
const resetPassword = require("../controllers/resetPasswordController");
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
route.post("/reset", resetPassword);

module.exports = route;
