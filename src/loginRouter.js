const { Router } = require('express');
const validateLogin = require('./middlewares/validateLogin');
const { STATUS_OK } = require('./helpers/constants');

const loginRouter = Router();

loginRouter.post('/', validateLogin, async (_req, res) => {
  const token = `${Date.now()}${Date.now()}`.slice(0, 16);
  res.json({ token }).status(STATUS_OK);
});

module.exports = loginRouter;