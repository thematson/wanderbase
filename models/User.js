const mongoose = require('mongoose');
const { Schema } = mongoose; //const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: String
});

mongoose.model('users', userSchema);