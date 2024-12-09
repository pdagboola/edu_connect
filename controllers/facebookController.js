const passport = require("../auth/passport");
const generateState = require("../helpers/generateState");

const facebookLogin = async (req, res, next) => {
  try {
    const state = generateState();
    req.session.oauthState = state;
    passport.authenticate("facebook", { state })(req, res, next);
  } catch (err) {
    next(err);
  }
};
const facebookCallback = async (req, res, next) => {
  passport.authenticate("facebook", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/auth/facebook");
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/questions");
    });
  })(req, res, next);
};

module.exports = { facebookLogin, facebookCallback };
