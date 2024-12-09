require("dotenv").config({
  path: "/Users/apple/Desktop/code/edu_connect/config/.env",
});

const FacebookStrategy = require("passport-facebook").Strategy;
const { createUser, getUserByFacebookId } = require("../../models/userModel");
const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    state: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const storedState = req.session.oauthState;
      const returnedState = req.query.state;

      if (storedState !== returnedState) {
        return done(new Error("Invalid state parameter"), null);
      }
      const user = await getUserByFacebookId(profile.id);
      if (!user) {
        const new_user = await createUser(profile.displayName, profile.id);
        return done(null, new_user);
      } else {
        return done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  }
);

module.exports = facebookStrategy;
