const User = require('../models/UserSchema');
const { verifyHashedPassword } = require('../utils/hashedPasswordUtility');
const { createToken, verifyToken } = require('../utils/TokenUtility');
module.exports.register = async (req, res) => {
    const user = req.body;
    try {
        if (!user)
            return res.status(404).json({ message: 'Invalid data' })

        const userData = {
            name: user.name,
            username: user.username,
            gender: user.gender,
            phone: user.phone,
            email: user.email,
            password: user.password,
            address: user.address,
        }

        const newUser = await User.create({ ...userData });
        console.log('user created : ', newUser.toJSON())

        const userTokenObject = { user_id: newUser.user_id, email: newUser.email }
        const newAccessToken = createToken(userTokenObject, process.env.ACCESS_TOKEN_KEY, '15s');
        const newRefreshToken = createToken(userTokenObject, process.env.REFRESH_TOKEN_KEY, '1h');

        return res.status(201).json({ message: 'User Registered Successfully!', user: newUser, accessToken: newAccessToken, refreshToken: newRefreshToken })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message })
    }
}

module.exports.login = async (req, res) => {

    const user = req.body;

    if (!user.email || !user.password)
        return res.status(400).json({ message: 'Bad Request' })

    const loggedinUser = await User.scope('withPassword').findOne({ where: { email: user.email } });

    if (!loggedinUser)
        return res.status(401).json({ message: 'Email or Password is invalid' })

    const isMatched = await verifyHashedPassword(user.password, loggedinUser.password)

    if (isMatched) {
        const userData = { user_id: loggedinUser.user_id, email: loggedinUser.email }
        const newAccessToken = createToken(userData, process.env.ACCESS_TOKEN_KEY, '15s');
        const newRefreshToken = createToken(userData, process.env.REFRESH_TOKEN_KEY, '1h');

        return res.status(200).json({ message: 'Logged in Successfully!', user: loggedinUser, accessToken: newAccessToken, refreshToken: newRefreshToken })
    }

    res.status(401).json({ message: 'Email or Password is invalid' })
}

module.exports.logout = async (req, res) => {
    res.status(200).json({ message: 'Logged Out successfully !' });
}

module.exports.authenticateUserOnRefresh = async (req, res) => {
    console.log('::::::: authenticateUserOnRefresh ::::::')
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Invalid Token' })
    }

    try {
        const user = verifyToken(token, process.env.ACCESS_TOKEN_KEY)
        const storedUser = await User.findOne({ where: { user_id: user.user_id } })

        const userData = {
            user_id: storedUser.user_id,
            username: storedUser.username,
            name: storedUser.name,
            gender: storedUser.gender,
            email: storedUser.email,
            phone: storedUser.phone,
            address: storedUser.address,
        }
        res.status(200).json({ user: userData });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' })
    }
}

module.exports.refresh = async (req, res) => {

    const refreshToken = req.body.refreshToken;
    console.log('refresh ::::::::::::::::::::: ', refreshToken)
    try {

        if (!refreshToken)
            return res.status(403).json({ message: 'Invalid Creadentials' });

        let user = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_KEY)

        user = await User.findOne({ where: { user_id: user.user_id } })

        if (!user)
            return res.status(403).json({ message: 'Invalid Creadentials' });

        const userData = { user_id: user.user_id, email: user.email }
        const newAccessToken = createToken(userData, process.env.ACCESS_TOKEN_KEY, '15s');
        const newRefreshToken = createToken(userData, process.env.REFRESH_TOKEN_KEY, '1h');

        return res.status(200).json({ message: 'Refresh Successfull', accessToken: newAccessToken, refreshToken: newRefreshToken, user: user })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
