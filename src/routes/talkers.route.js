const express = require('express');
const { getTalkers } = require('../services/getAllTalkers');
const generateToken = require('../services/generateToken');

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

router.post('/login', (req, res) => {
    const token = generateToken();
    res.status(200).json({ token });
});

module.exports = router;