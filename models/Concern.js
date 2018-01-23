const mongoose = require("mongoose");
const { Schema } = mongoose; //const Schema = mongoose.Schema;
const FollowUpSchema = require("./FollowUp");
const RecipientSchema = require("./Recipient");

const concernSchema = new Schema({
  guestName: { type: String, required: true, trim: true },
  zipCode: { type: String, required: true, trim: true },
  descOfConcern: String,
  clerkId: { type: String, required: true, trim: true },
  recipients: String,
  recoveryCheck: String,
  descOfRecovery: String,
  _user: { type: Schema.Types.ObjectId, ref: "User " },
  dateRecorded: Date
});

mongoose.model("concerns", concernSchema);
