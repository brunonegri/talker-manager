const fs = require('fs').promises;
const { join } = require('path');
const { getTalkers } = require('./getAllTalkers');

const file = join(__dirname, '../talker.json');

const insertTalker = async (talker) => {
    const talkers = await getTalkers();
    const id = talkers.length + 1;
    const newTalker = { id, ...talker };
    talkers.push(newTalker);
    fs.writeFile(file, JSON.stringify(talkers));
    return newTalker;
};

module.exports = insertTalker;