const { Router } = require('express');
const validateLogin = require('./middlewares/validateLogin');

const loginRouter = Router();

loginRouter.post('/', validateLogin, async (_req, res) => {
  try {
    const token = `${Date.now()}${Date.now()}`.slice(0, 16);
    res.json({ token }).status(200);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = loginRouter;