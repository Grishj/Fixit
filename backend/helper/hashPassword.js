const bcrypt = require("bcrypt");

async function hashPassword(password) {
    const saltRounds = 10; // Adjust this value as needed (higher = more secure, 10 was default )
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

module.exports = hashPassword;
