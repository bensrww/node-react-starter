const mongoose = require('mongoose');
const moment = require('moment');

const tokenStatus = {
  READY: 'READY',
  USED: 'USED',
  INVALID: 'INVALID',
  PENDING: 'PENDING',
};

const { READY, PENDING, INVALID, USED } = tokenStatus;

const Token = mongoose.model('tokens');

module.exports = (app) => {
  app.get('/api/token', async (req, res) => {
    const tokens = await Token.find({ teamNumber: req.query.teamNumber });
    return res.status(200).send(tokens);
  });

  app.get('/api/getOneToken', async (req, res) => {
    const allReadyTokens = await Token.find({
      status: READY,
      teamNumber: req.query.teamNumber,
    });
    const earliestToken = allReadyTokens[0];
    if (earliestToken) {
      earliestToken.status = PENDING;
      await earliestToken.save();
      console.log('sent token', earliestToken);
      return res.status(200).send(earliestToken);
    }
    return res.status(500).send({
      errorMsg:
        'Not enough tokens available, please contact responsible person to generate',
    });
  });

  app.get('/api/getNumberOfTokens', async (req, res) => {
    const allReadyTokens = await Token.find({
      status: READY,
      teamNumber: req.query.teamNumber,
    });

    const numberOfTokens = allReadyTokens.length;
    return res.status(200).send({ numberOfTokens });
  });

  app.post('/api/updateTokenStatus', async (req, res) => {
    console.log('updateToken req body', req.body);
    if (req.body && req.body.id) {
      const { id, status, teamNumber } = req.body;
      await Token.findByIdAndUpdate(id, {
        status,
        teamNumber,
      });
      return res.status(200).send();
    }
  });

  app.post(`/api/token`, async (req, res) => {
    const tokens = req.body.tokenValues.match(/.{1,6}/g);
    const allReadyTokens = await Token.find({
      teamNumber: req.body.teamNumber,
    });

    const numberOfTokens = allReadyTokens.length;
    console.log('numberOfTokens', numberOfTokens);

    const promises = tokens.map((tokenValue, index) => {
      const obj = {
        value: tokenValue,
        status: READY,
        timeStamp: moment(),
        teamNumber: req.body.teamNumber,
        sequence: numberOfTokens + index,
      };
      return Token.create(obj);
    });
    const resp = await Promise.all(promises);
    return res.status(201).send({
      error: false,
      resp,
    });
  });

  app.put(`/api/token/:id`, async (req, res) => {
    const { id } = req.params;

    let token = await Token.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      token,
    });
  });

  app.delete(`/api/token/:id`, async (req, res) => {
    const { id } = req.params;

    let token = await Token.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      token,
    });
  });

  app.delete(`/api/deleteAllTokens`, async (req, res) => {
    const token = await Token.deleteMany({ teamNumber: req.query.teamNumber });

    return res.status(202).send({
      error: false,
      token,
    });
  });
};
