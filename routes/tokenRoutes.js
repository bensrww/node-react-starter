const mongoose = require('mongoose');

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
    const tokens = await Token.find();
    return res.status(200).send(tokens);
  });

  app.get('/api/randomToken', async (req, res) => {
    const allReadyTokens = await Token.find({ status: READY });
    const randomToken =
      allReadyTokens[Math.floor(Math.random() * allReadyTokens.length)];
    if (randomToken) {
      randomToken.status = PENDING;
      await randomToken.save();
      console.log('sent token', randomToken);
      return res.status(200).send(randomToken);
    }
    return res
      .status(500)
      .send({
        errorMsg:
          'Not enough tokens available, please contact responsible person to generate',
      });
  });

  app.post(`/api/token`, async (req, res) => {
    console.log('post body', req.body);
    const token = await Token.create(req.body);
    return res.status(201).send({
      error: false,
      token,
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
};
