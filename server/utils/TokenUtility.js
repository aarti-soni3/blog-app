const jwt = require('jsonwebtoken');

module.exports.createToken = (user, key, expiresIn) => {
    return jwt.sign(user, key, { expiresIn })
}

module.exports.verifyToken = (token, key) => {
        return jwt.verify(token, key)
}