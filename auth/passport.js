require("dotenv").config({ path: "../config" });
const passport = require("passport");
const jwtStrategy = require("./strategies/jwtStrategy");
const googleStrategy = require("./strategies/googleStrategy");

passport.use(jwtStrategy);
passport.use(googleStrategy);

// passport.serializeUser((user, done) => done(null, user.id));

// passport.deserializeUser((id, done) => {
//   const user = users.find((u) => u.id === id);
//   done(null, user || null);
// });
module.exports = passport;
