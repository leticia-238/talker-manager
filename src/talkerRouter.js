const { Router } = require('express');
const readFile = require('./helpers/readFile');
const writeFile = require('./helpers/writeFile');
const validateAuth = require('./middlewares/validateAuth');
const validateTalker = require('./middlewares/validateTalker');
const { 
  STATUS_OK, 
  STATUS_NOT_FOUND, 
  STATUS_CREATED,
  STATUS_NO_CONTENT, 
} = require('./helpers/constants');

const talkerRouter = Router();

const TALKER_NOT_FOUND = 'Pessoa palestrante não encontrada';

talkerRouter.get('/', async (_req, res) => {
  const data = await readFile();
  res.json(data).status(STATUS_OK);
});

talkerRouter.get('/search', validateAuth, async (req, res) => {
  const data = await readFile();
  const { q } = req.query; 
  const talkersList = data.filter(({ name }) => name.includes(q));

  res.status(STATUS_OK).json(talkersList);
});

talkerRouter.get('/:id', async (req, res) => {
  const data = await readFile();
  const { id } = req.params;
  const talker = data.find((t) => t.id === Number(id));

  if (talker) return res.json(talker).status(STATUS_OK);
  res.status(STATUS_NOT_FOUND).json({ message: TALKER_NOT_FOUND });
});

talkerRouter.post('/', validateAuth, validateTalker, async (req, res) => {
  const data = await readFile();
  const talker = req.body;
  talker.id = data.length + 1;
  await writeFile([...data, talker]);
  res.status(STATUS_CREATED).json(talker);
});

talkerRouter.put('/:id', validateAuth, validateTalker, async (req, res) => {
  const newTalker = req.body;
  const data = await readFile();
  const { id } = req.params;
  const talkerIndex = data.findIndex((t) => t.id === Number(id));
  const changedTalker = { ...newTalker, id: Number(id) };
  data[talkerIndex] = changedTalker;
  
  await writeFile(data);
  res.status(STATUS_OK).json(changedTalker);
});

talkerRouter.delete('/:id', validateAuth, async (req, res) => {
  const data = await readFile();
  const { id } = req.params;
  const talkerIndex = data.findIndex((t) => t.id === Number(id));
  data.splice(talkerIndex, 1);
  
  await writeFile(data);
  res.status(STATUS_NO_CONTENT).send();
});

module.exports = talkerRouter;