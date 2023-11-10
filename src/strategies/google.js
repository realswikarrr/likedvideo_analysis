import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../db/Schema/User.js";

passport.serializeUser(async function (user, done) {
  const userId = user._id.toString();
  done(null, userId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userExists = await User.findOne({
          email: profile._json.email,
        }).exec();
        if (userExists) {
          return done(null, userExists);
        } else {
          console.log("insert user");
          var user = new User({
            access_token: accessToken,
            refresh_token: refreshToken,
            name: profile.displayName,
            email: profile._json.email,
          });

          user.save();

          return done(null, user);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
