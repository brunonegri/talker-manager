const express = require('express');
const { getTalkers, updateTalkers } = require('../services/getAllTalkers');
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
const editTalker = require('../services/editTalker');

const router = express.Router();

router.get('/talker', async (req, res) => {
    const talkers = await getTalkers();
    if (talkers.length < 1) {
      return res.status(200).json([]);
    }
    
    res.status(200).json(talkers);
  });

  router.get('/talker/search', authValidation, async (req, res) => {
    const { q } = req.query;
    const talkers = await getTalkers();
    const searched = talkers.filter((e) => (e.name).includes(q));
    return res.status(200).json(searched);
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

router.put('/talker/:id',
authValidation,
nameValidation, 
ageValidation,
talkValidation,
watchedValidation,
rateValidation,
 async (req, res) => {
    const { id } = req.params;
    const editTalk = await editTalker(id, req.body);
    res.status(200).json(editTalk);
});

router.delete('/talker/:id', authValidation, async (req, res) => {
    const { id } = req.params;
    const talkers = await getTalkers();
    const newList = talkers.filter((e) => e.id !== Number(id));
    updateTalkers(newList);
    res.status(204).end();
});

module.exports = router;