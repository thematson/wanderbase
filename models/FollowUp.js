const mongoose = require("mongoose");
const { Schema } = mongoose; //const Schema = mongoose.Schema;

const followUpSchema = new Schema({
  followUp: { type: Boolean, default: false },
  followUpDetail: String,
  followUpDate: Date
});

module.exports = followUpSchema;