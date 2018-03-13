const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
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
  app.delete("/api/concerns/:_id", requireLogin, async (req, res) => {
    console.log("DELEEeeeetteeddddd");
    console.log(req.params);

    const deleteThis = await Concern.deleteOne({ _id: req.params._id }).catch(
      err => res.status(422).json(err)
    );
    res.send(deleteThis);
  });

  app.post("/api/concerns_update", requireLogin, async (req, res) => {
    console.log("newest route hit!!!!!!@@@@@@@@@@");
    console.log(req.body);
    console.log(req.body.params.descOfRecovery);
    console.log("id is " + req.body.params.id);

    const update = await Concern.update(
      { _id: req.body.params.id },
      {
        $set: {
          descOfRecovery: req.body.params.descOfRecovery,
          recoveryCheck: req.body.params.recoveryCheck
        }
      },
      {
        new: true
      }
    );
    console.log(update);

    res.send(update);
  });

  app.get("/api/concerns", requireLogin, async (req, res) => {
    const concerns = await Concern.find({}).sort({ dateRecorded: -1 });
    res.send(concerns);
  });

  app.get("/api/concern_search", async (req, res) => {
    console.log("this route is hit!!!!!!!!!!!!!!!!!!!!!");
    console.log(req.query);

    const search = await Concern.find({
      guestName: req.query.guestName,
      zipCode: req.query.zipCode
    });
    res.send(search);
  });

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
      recoveryCheck: recoveryCheck || "N/A",
      descOfRecovery: descOfRecovery || "N/A",
      _user: req.user.id,
      dateRecorded: Date.now()
    });

    console.log(concern);

    const mailOptions = {
      from: "noreply@wanderbase.com", // sender address
      to: recipients, // list of receivers
      subject: "wanderBase Activity", // Subject line
      html:
        "<p>There has been activity on wanderBase. <a href='https://pure-sea-27226.herokuapp.com/'>Click to visit app.</a></p><br/>Brought to you by <a href='http://ericmatson.io/'>Eric Matson</a><br/><a href='mailto:eric.matson@gmail.com'>eric.matson@gmail.com</a>" // plain text body
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
