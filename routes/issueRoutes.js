const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Mailer = require('../services/Mailer');
const emailResponse = require('../services/emailResponse');

const nodemailer = require("nodemailer");

const Issue = mongoose.model("issues");



module.exports = app => {
  app.post("/api/issues", requireLogin, (req, res) => {
    const { guestFirstName,
      guestLastName,
      guestZipCode,
      recipients
    } = req.body;

    const issue = new Issue({
      guestFirstName,
      guestLastName,
      guestZipCode,
      detail,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      followUp: followUp.map(followUpDetail => ({ followUpDetail })),
      _user: req.user.id,
      dateRecorded: Date.now()
    });


    //send email here?
    const mailer = new Mailer(issue, emailResponse(issue));
    mailer.send();
  });
};
