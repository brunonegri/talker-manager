const fs = require('fs').promises;
const { join } = require('path');

const { getTalkers } = require('./getAllTalkers');

const file = join(__dirname, '../talker.json');

const editTalker = async (sID, editedTalker) => {
    const talkers = await getTalkers();
    const id = Number(sID);
    const talkerID = talkers.find((e) => e.id === id);
    const index = talkers.indexOf(talkerID);
    const editTalk = { id, ...editedTalker };
    talkers.splice(index, 1, editTalk);

    fs.writeFile(file, JSON.stringify(talkers));
    return editTalk;
};

module.exports = editTalker;