const { Router } = require('express');
const readFile = require('./helpers/readFile');

const talkerRouter = Router();

talkerRouter.get('/', async (_req, res) => {
  try {
    const data = await readFile();
    res.json(data).status(200);
  } catch (error) {
    console.log(error.message);
  }
});

talkerRouter.get('/:id', async (req, res) => {
  try {
    const data = await readFile();
    const { id } = req.params;
    const talker = data.find((t) => t.id === Number(id));
    
    if (talker) return res.json(talker).status(200);
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = talkerRouter;