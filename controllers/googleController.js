const passport = require("../auth/passport");
const generateState = require("../helpers/generateState");

const googleLogin = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: generateState(),
  })(req, res, next);
};

const googleCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    (err, user, info) => {
      if (err) {
        console.log(err, "error");

        return next(err);
      }
      if (!user) {
        console.log(user, "user");
        return res.redirect("/question");
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/question");
      });
    }
  )(req, res, next);
};

module.exports = { googleLogin, googleCallback };
