const { Router } = require('express');
const readFile = require('./helpers/readFile');

const talkerRouter = Router();

const talkerNotFound = 'Pessoa palestrante não encontrada';

talkerRouter.get('/', async (_req, res) => {
    const data = await readFile();
    res.json(data).status(200);
});

talkerRouter.get('/:id', async (req, res) => {
    const data = await readFile();
    const { id } = req.params;
    const talker = data.find((t) => t.id === Number(id));
    
    if (talker) return res.json(talker).status(200);
    res.status(404).json({ message: talkerNotFound });
});

module.exports = talkerRouter;