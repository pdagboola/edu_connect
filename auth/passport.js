require("dotenv").config({ path: "../config" });
const passport = require("passport");
const jwtStrategy = require("./strategies/jwtStrategy");
const googleStrategy = require("./strategies/googleStrategy");
const facebookStrategy = require("./strategies/facebookStrategy");

passport.use(jwtStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  try {
    const user = users.find((u) => u.id === id);
    done(null, user || null);
  } catch (err) {
    done(err, null);
  }
});
module.exports = passport;
