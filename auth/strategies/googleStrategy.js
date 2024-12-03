require("dotenv").config({
  path: "/Users/apple/Desktop/code/edu_connect/config/.env",
});
const passport = require("passport");
const GoogleOIDCStrategy = require("passport-google-oidc").Strategy;

const {
  getUserByGoogleId,
  createUserByGoogleID,
} = require("../../models/userModel");

const googleStrategy = new GoogleOIDCStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async (issuer, profile, done) => {
    try {
      let user = await getUserByGoogleId(profile.id);
      if (user.length === 0) {
        const date_joined = new Date().toISOString();
        const new_user = await createUserByGoogleID(
          profile.id,
          profile.displayName,
          profile.emails[0].value,
          date_joined
        );
        done(null, new_user);
      } else {
        return done(null, user[0]);
      }
    } catch (err) {
      done(err, false);
    }
  }
);

module.exports = googleStrategy;
