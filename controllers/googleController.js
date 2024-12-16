const passport = require("../auth/passport");
const generateState = require("../helpers/generateState");
const jwt = require("jsonwebtoken");

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
        return next(err);
      }
      if (!user) {
        return res.redirect("/auth/google");
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.cookie("jwt", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        return res.redirect("/question");
      });
    }
  )(req, res, next);
};

module.exports = { googleLogin, googleCallback };
