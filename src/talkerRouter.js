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

talkerRouter.get('/:id', (req, res) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(data);
  
  const { id } = req.params;

  const talker = parsed.find((t) => t.id === Number(id));
  
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
  res.json(talker).status(200);
});

module.exports = talkerRouter;