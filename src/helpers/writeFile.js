const fs = require('fs').promises;
const path = require('path');

const filePath = path.resolve(__dirname, '../../talker.json');

const writeFile = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data));
};

module.exports = writeFile;