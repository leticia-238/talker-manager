const fs = require('fs').promises;
const path = require('path');

const filePath = path.resolve(__dirname, '../../talker.json');

const readFile = async () => {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

module.exports = readFile;