const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

const comparePassword = async (plainText, hashed) => await bcrypt.compare(plainText, hashed);

module.exports = { hashPassword, comparePassword };
