const mongoose = require('mongoose');

const { Schema } = mongoose;

const tokenSchema = new Schema({
  value: String,
  status: String,
  timeStamp: String,
});

mongoose.model('tokens', tokenSchema);
