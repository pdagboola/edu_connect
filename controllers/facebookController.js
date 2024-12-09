const passport = require("../auth/passport");
const generateState = require("../helpers/generateState");

const facebookController = async (req, res) => {
  try {
    const state = generateState();
    req.session.oauthState = state;
    passport.authenticate("facebook", { state })(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = facebookController;
