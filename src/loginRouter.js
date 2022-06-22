const { Router } = require('express');
const { randomUUID } = require('crypto');
const validateLogin = require('./middlewares/validateLogin');

const loginRouter = Router();

loginRouter.post('/', validateLogin, async (_req, res) => {
    const token = randomUUID().slice(0, 16);
    res.json({ token }).status(200);
});

module.exports = loginRouter;