const bcrypt = require('bcrypt');

// utility functions for hashing n verifing password

module.exports.hashedPassword = async (password, salt = 12) => {
    return await bcrypt.hash(password, salt);
}

module.exports.verifyHashedPassword = async (newPassword, storedPassword) => {
    return await bcrypt.compare(newPassword, storedPassword)
}