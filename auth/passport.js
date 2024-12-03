const passport = require("passport");
const jwtStrategy = require("./strategies/jwtStrategy");

passport.use(jwtStrategy);

module.exports = passport;
