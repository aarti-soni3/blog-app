const jwt = require('jsonwebtoken');

module.exports.createToken = (user, key, expiresIn) => {
    return jwt.sign(user, key, { expiresIn })
}

module.exports.verifyToken = (token, key) => {
    return jwt.verify(token, key)
}

module.exports.getAuthToken = (req) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        return token;
    } catch (error) {
        throw new Error(error);
    }
}