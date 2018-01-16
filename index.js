const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const nodemailer = require("nodemailer");
require("./models/User");
require("./models/Issue");

require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

// const emailList = ["eric.matson@gmail.com", "matson@live.com"];

// //*********************** email start

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "wanderbasemail@gmail.com",
//     pass: "wanderbase99"
//   }
// });

// const mailOptions = {
//   from: "wanderbasemail@gmail.com", // sender address
//   to: emailList, // list of receivers
//   subject: "wanderbase new document", // Subject line
//   html:
//     "<p>There has been a new document created in <a href='https://pure-sea-27226.herokuapp.com/'>wanderbase</a>. Please visit the <a href='https://pure-sea-27226.herokuapp.com/'>app</a> for more details.</p><br/><p>Thank You.</p>" // plain text body
// };

// // actually sends email below

// transporter.sendMail(mailOptions, function(err, info) {
//   if (err) console.log(err);
//   else console.log(info);
// });

//***************************email stop */

const app = express();

app.use(
  cookieSession({
    //below translates = 30 days * hours * min * sec * millisec
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/issueRoutes")(app);

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
