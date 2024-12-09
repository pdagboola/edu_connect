const passport = require("../auth/passport");

const googleLogin = async () => {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
};

const googleCallback = async () => {
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    (err, user, info) => {
      if (err) {
        return next(err); // Handle errors
      }
      if (!user) {
        return res.redirect("/login"); // Redirect if user is not authenticated
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/user/dashboard"); // Redirect to dashboard after successful login
      });
    }
  )(req, res, next);
};

module.exports = { googleLogin, googleCallback };
