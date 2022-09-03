const fs = require('fs').promises;

const { join } = require('path');

const file = join(__dirname, '../talker.json');

const readTalkerFile = async () => {
    try {
      const content = await fs.readFile(file, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.log('erro na leitura', error.message);
    }
  };
  
  const getTalkers = async () => {
    const data = await readTalkerFile();
    return data;
  };

  const updateTalkers = (talker) => fs.writeFile(file, JSON.stringify(talker));

module.exports = { getTalkers, updateTalkers };