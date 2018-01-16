const mongoose = require("mongoose");
const { Schema } = mongoose; //const Schema = mongoose.Schema;
const FollowUpSchema = require("./FollowUp");
const RecipientSchema = require("./Recipient");

const issueSchema = new Schema({
  guestFirstName: { type: String, required: true, trim: true },
  guestLastName: { type: String, required: true, trim: true },
  guestZipCode: { type: String, required: true, trim: true },
  localUserId: String,
  detail: String,
  recipients: [RecipientSchema],
  followUp: [FollowUpSchema],
  _user: { type: Schema.Types.ObjectId, ref: "User " },
  dateRecorded: Date
});

mongoose.model("issues", issueSchema);
