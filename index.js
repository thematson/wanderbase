const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const session = require("express-session");
const cloudinary = require("cloudinary");

const keys = require("./config/keys");
const nodemailer = require("nodemailer");
require("./models/User");
require("./models/Concern");

require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json()); // get information from html forms

app.use(
  cookieSession({
    //below translates = 30 days * hours * min * sec * millisec
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());


// routes ======================================================================
// require("./app/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport

require("./routes/authRoutes")(app);
require("./routes/concernRoutes")(app);
// require("./routes/fileuploadRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //express will serve up prodeuction assets
  //like main.js or main.css
  app.use(express.static("client/build"));

  //or express will serve up index.html file
  //if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
