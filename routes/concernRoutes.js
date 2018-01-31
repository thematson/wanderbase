// import { read } from "fs";

// import { read } from "fs";

const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
// const Mailer = require("../services/Mailer");
// const emailResponse = require("../services/emailResponse");

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
  app.delete('/api/concerns/:_id', requireLogin , async (req, res) => {
     Concern.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  app.post('/api/concerns_update', requireLogin, async (req,res) => {
    console.log("newest route hit!!!!!!@@@@@@@@@@");
    const update = await Concern.findOneAndRemove(
        {guestName: req.query.guestName, zipCode: req.query.zipCode},
        { $set: { descOfConcern: req.query.descOfRecovery,
          recoveryCheck: req.query.recoveryCheck}},
        {
          returnNewDocument: true
        }
      )
    res.send(update);
  });

  app.get('/api/concerns', requireLogin, async (req, res) => {
    const concerns = await Concern.find({}).sort({dateRecorded: -1})
    res.send(concerns);
  });

  app.get('/api/concern_search', async (req, res) => {
    console.log("this route is hit!!!!!!!!!!!!!!!!!!!!!");
    console.log(req.query);

    const search = await Concern.find({ guestName: req.query.guestName, zipCode: req.query.zipCode })
    res.send(search);
  })

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
      recoveryCheck : recoveryCheck || "N/A",
      descOfRecovery : descOfRecovery || "N/A",
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
    try {
      await transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log(err);
        else console.log(info);
      });
      await concern.save();
      res.send();
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
