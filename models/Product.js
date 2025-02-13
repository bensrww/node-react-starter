const mongoose = require('mongoose');

const { Schema } = mongoose;

const tokenSchema = new Schema({
  value: String,
  status: String,
  timeStamp: String,
  teamNumber: Number,
  sequence: Number,
});

mongoose.model('tokens', tokenSchema);
