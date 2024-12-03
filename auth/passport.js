require("dotenv").config({ path: "../config" });
const passport = require("passport");
const jwtStrategy = require("./strategies/jwtStrategy");
const googleStrategy = require("./strategies/googleStrategy");

passport.use(jwtStrategy);
passport.use(googleStrategy);

module.exports = passport;
