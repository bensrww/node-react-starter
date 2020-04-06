const mongoose = require('mongoose');

const Token = mongoose.model('tokens');

module.exports = (app) => {
  app.get(`/api/token`, async (req, res) => {
    let tokens = await Token.find();
    return res.status(200).send(tokens);
  });

  app.post(`/api/token`, async (req, res) => {
    console.log('post body', req.body);
    let token = await Token.create(req.body);
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
