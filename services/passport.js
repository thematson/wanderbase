// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Auth0Strategy = require("passport-auth0");
const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use (
   new Auth0Strategy(
  {
    domain: "thematson.auth0.com",
    clientID: "42x5qwzEZa1a6Ndju0ys2RFq6GyFBWte",
    clientSecret:
      "caktGt-ACepQSjcKQ6oqLo6y4-d7sjvqIbMF-NLaKy9-NBTzO2W-vpl-SYF0Bq6r",
    callbackURL: "/callback",
    proxy: true,
    scope: "openid email profile"
  },
  async (accessToken, refreshToken, extraParams, profile, done) => {
    const existingUser = await User.findOne({ user_id: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }
    const user = await new User({ user_id: profile.id }).save();
    done(null, user);
     }
  )
);



// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       callbackURL: '/auth/google/callback',
//       proxy: true
//     },
//     async (accessToken, refreshToken, extraParams, profile, done) => {
//     const existingUser = await User.findOne({ googleId: profile.id })
//     if (existingUser) {
//       return done(null, existingUser);
//     }
//       const user = await new User({ googleId: profile.id }).save()
//       done(null, user);
//     }
//   )
// );
