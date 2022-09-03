const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const path = './talker.json';
const { join } = require('path');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const readTalkerFile = async () => {
  try {
    const content = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.log('erro na leitura', error.message);
  }
};

const getTalkers = async () => {
  const data = await readTalkerFile();
  return data;
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await getTalkers();
  if (talkers.length < 1) {
    return res.status(200).json([]);
  }
  
  res.status(200).json(talkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
