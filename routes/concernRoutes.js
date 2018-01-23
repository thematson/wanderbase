const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Mailer = require("../services/Mailer");
const emailResponse = require("../services/emailResponse");

const nodemailer = require("nodemailer");

const Concern = mongoose.model("concerns");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "wanderbasemail@gmail.com",
    pass: "Wanderbase99!"
  }
});

module.exports = app => {
  app.post("/api/concerns", requireLogin, async (req, res) => {

    const {
      guestName,
      zipCode,
      descOfConcern,
      clerkId,
      recipients,
      recoveryCheck,
      descOfRecovery
    } = req.body;

    const concern = new Concern({
      guestName,
      zipCode,
      descOfConcern,
      clerkId,
      recipients,
      recoveryCheck,
      descOfRecovery,
      _user: req.user.id,
      dateRecorded: Date.now()
    });

    console.log(concern);


    const mailOptions = {
      from: "noreply@wanderbase.com", // sender address
      to: recipients, // list of receivers
      subject: "wanderBase Activity", // Subject line
      html: "<p>There has been activity on wanderBase</p>" // plain text body
    };

    console.log(recipients);

    try{
      await transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log(err);
        else console.log(info);
      });

      await concern.save();
    } catch (err) {
      res.status(422).send(err);
    }

    //send email here?
    // const mailer = new Mailer(issue, emailResponse(issue));
    // mailer.send();
  });
};
