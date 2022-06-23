const { Router } = require('express');
const readFile = require('./helpers/readFile');
const writeFile = require('./helpers/writeFile');
const validateAuth = require('./middlewares/validateAuth');
const validateTalker = require('./middlewares/validateTalker');

const talkerRouter = Router();

const talkerNotFound = 'Pessoa palestrante não encontrada';

talkerRouter.get('/', async (_req, res) => {
  const data = await readFile();
  res.json(data).status(200);
});

talkerRouter.get('/search', validateAuth, async (req, res) => {
  const data = await readFile();
  const { q } = req.query; 
  const talkersList = data.filter(({ name }) => name.includes(q));

  res.status(200).json(talkersList);
});

talkerRouter.get('/:id', async (req, res) => {
  const data = await readFile();
  const { id } = req.params;
  const talker = data.find((t) => t.id === Number(id));

  if (talker) return res.json(talker).status(200);
  res.status(404).json({ message: talkerNotFound });
});

talkerRouter.post('/', validateAuth, validateTalker, async (req, res) => {
  const data = await readFile();
  const talker = req.body;
  talker.id = data.length + 1;
  await writeFile([...data, talker]);
  res.status(201).json(talker);
});

talkerRouter.put('/:id', validateAuth, validateTalker, async (req, res) => {
  const newTalker = req.body;
  const data = await readFile();
  const { id } = req.params;
  const talkerIndex = data.findIndex((t) => t.id === Number(id));
  const changedTalker = { ...newTalker, id: Number(id) };
  data[talkerIndex] = changedTalker;
  
  await writeFile(data);
  res.status(200).json(changedTalker);
});

talkerRouter.delete('/:id', validateAuth, async (req, res) => {
  const data = await readFile();
  const { id } = req.params;
  const talkerIndex = data.findIndex((t) => t.id === Number(id));
  data.splice(talkerIndex, 1);
  
  await writeFile(data);
  res.status(204).send();
});

module.exports = talkerRouter;