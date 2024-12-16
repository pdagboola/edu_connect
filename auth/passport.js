require("dotenv").config({ path: "../config" });
const passport = require("passport");
const jwtStrategy = require("./strategies/jwtStrategy");
const googleStrategy = require("./strategies/googleStrategy");
const facebookStrategy = require("./strategies/facebookStrategy");
const { getAllUsers } = require("../models/userModel");

passport.use(jwtStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);

passport.serializeUser((user, done) => {
  console.log(user, "user serialize");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const users = await getAllUsers();
    const user = users.find((u) => u.id || u.google_id || u.facebook_id === id);
    done(null, user || null);
  } catch (err) {
    done(err, null);
  }
});
module.exports = passport;
