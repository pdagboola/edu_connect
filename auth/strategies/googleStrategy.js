require("dotenv").config({
  path: "/Users/apple/Desktop/code/edu_connect/config/.env",
});
const GoogleOIDCStrategy = require("passport-google-oidc").Strategy;

const {
  getUserByGoogleId,
  createUserByGoogleID,
} = require("../../models/userModel");

const googleStrategy = new GoogleOIDCStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (issuer, profile, done) => {
    console.log(profile, "profile");
    try {
      let user = await getUserByGoogleId(profile.id);
      if (user.length > 0) {
        console.log(user, "user in google strategy");
        return done(null, user[0]);
      } else {
        const date_joined = new Date().toISOString();
        const new_user = await createUserByGoogleID(
          profile.displayName,
          profile.id,
          profile.emails[0].value,
          date_joined
        );
        console.log("new user", new_user);
        return done(null, new_user);
      }
    } catch (err) {
      return done(err, false);
    }
  }
);

module.exports = googleStrategy;
