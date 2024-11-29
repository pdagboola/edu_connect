require("dotenv").config();
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};

opts.secretKey = process.env.SECRET_KEY;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

passport.use(
  new JwtStrategy(
    opts,
    (verify = async (jwt_payload, done) => {
      try {
        const user = await findUserById(jwt_payload.sub);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  )
);

module.exports = passport;
