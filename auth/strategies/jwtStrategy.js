require("dotenv").config({
  path: "/Users/apple/Desktop/code/edu_connect/config/.env",
});
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const { getUserById } = require("../../models/userModel");

const opts = {};
opts.secretOrKey = process.env.JWT_SECRET;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

const jwtStrategy = new JwtStrategy(
  opts,
  (verify = async (jwt_payload, done) => {
    try {
      const user = await getUserById(jwt_payload.sub);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
module.exports = jwtStrategy;
