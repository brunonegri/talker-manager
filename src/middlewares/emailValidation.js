const emailValidation = (req, res, next) => {
    const { email } = req.body;
    const regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const validate = regex.test(email);
    if (!email || email === undefined) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (validate === false) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

module.exports = emailValidation;