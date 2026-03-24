const bcrypt = require('bcrypt');

module.exports.hashedPassword = async (password, salt = 12) => {
    return await bcrypt.hash(password, salt);
}

module.exports.verifyHashedPassword = async (newPassword, storedPassword) => {
    return await bcrypt.compare(newPassword, storedPassword)
}