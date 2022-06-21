const { Router } = require('express');
const fs = require('fs');
const path = require('path');

const talkerRouter = Router();

const filePath = path.resolve(__dirname, '../talker.json');

talkerRouter.get('/', (_req, res) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(data);
  res.json(parsed).status(200);
});

module.exports = talkerRouter;