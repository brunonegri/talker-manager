const express = require('express');
const { getTalkers } = require('../services/getAllTalkers');
const generateToken = require('../services/generateToken');
const emailValidation = require('../middlewares/emailValidation');
const passwordValidation = require('../middlewares/passwordValidation');
const insertTalker = require('../services/insertTalker');
const authValidation = require('../middlewares/authValidaton');
const nameValidation = require('../middlewares/nameValidation');
const ageValidation = require('../middlewares/ageValidation');
const talkValidation = require('../middlewares/talkValidation');
const watchedValidation = require('../middlewares/watchedValidation');
const rateValidation = require('../middlewares/rateValidation');

const router = express.Router();

router.get('/talker', async (req, res) => {
    const talkers = await getTalkers();
    if (talkers.length < 1) {
      return res.status(200).json([]);
    }
    
    res.status(200).json(talkers);
  });
  
router.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await getTalkers();
    const talkerId = talkers.find((e) => e.id === Number(id));
    if (talkerId === undefined) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    
    res.status(200).json(talkerId);
  });

router.post('/login', emailValidation, passwordValidation, (req, res) => {
    const token = generateToken();
    res.status(200).json({ token });
});

router.post('/talker',
authValidation,
nameValidation, 
ageValidation,
talkValidation,
watchedValidation,
rateValidation,
async (req, res) => {
    const newTalker = req.body;
    const talkers = await insertTalker(newTalker);
    res.status(201).json(talkers);
});

module.exports = router;