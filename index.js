const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./models/Product');
require('dotenv').config();

const app = express();

mongoose.Promise = global.Promise;

const remoteDbUrl =
  'mongodb+srv://admin-ben:Pass1234@cluster0-cjwhd.mongodb.net/tokensDB';

mongoose.connect(process.env.MONGODB_URI || remoteDbUrl);

app.use(bodyParser.json());

require('./routes/tokenRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
