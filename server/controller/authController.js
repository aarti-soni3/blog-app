const Address = require('../models/AddressSchema');
const User = require('../models/UserSchema');
const { verifyHashedPassword } = require('../utils/hashedPasswordUtility');
const { createToken, verifyToken, getAuthToken } = require('../utils/TokenUtility');
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
        }

        const existingUser = await User.findOne({ where: { email: user.email } });

        if (existingUser)
            return res.status(400).json({ message: 'user exist...please use other email-id !' });

        const newUser = await User.create({ ...userData });
        console.log('user created : ', newUser.toJSON())

        const addressData = {
            address: user.address,
            city: user.city,
            state: user.state,
            zip: user.zip,
            userId: newUser.userId,
        }

        const address = await Address.create({ ...addressData })

        const userTokenObject = { userId: newUser.userId, email: newUser.email }
        const newAccessToken = createToken(userTokenObject, process.env.ACCESS_TOKEN_KEY, '5m');
        const newRefreshToken = createToken(userTokenObject, process.env.REFRESH_TOKEN_KEY, '1h');

        return res.status(201).json({ message: 'User Registered Successfully!', user: newUser, accessToken: newAccessToken, refreshToken: newRefreshToken })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message })
    }
}

module.exports.login = async (req, res) => {

    const user = req.body;
    try {
        if (!user.email || !user.password)
            return res.status(400).json({ message: 'Invalid Data' })

        const loggedinUser = await User.scope('withPassword').findOne({ where: { email: user.email } });

        if (!loggedinUser)
            return res.status(401).json({ message: 'Email or Password is invalid' })

        const isMatched = await verifyHashedPassword(user.password, loggedinUser.password)

        if (isMatched) {
            const userData = { userId: loggedinUser.userId, email: loggedinUser.email }
            const newAccessToken = createToken(userData, process.env.ACCESS_TOKEN_KEY, '5m');
            const newRefreshToken = createToken(userData, process.env.REFRESH_TOKEN_KEY, '1h');

            return res.status(200).json({ message: 'Logged in Successfully!', user: loggedinUser, accessToken: newAccessToken, refreshToken: newRefreshToken })
        }
        return res.status(401).json({ message: 'Email or Password is invalid' })

    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports.logout = async (req, res) => {
    res.status(200).json({ message: 'Logged Out successfully !' });
}

module.exports.authenticateUserOnRefresh = async (req, res) => {

    try {
        // const token = getAuthToken(req)

        // if (!token)
        // return res.status(401).json({ message: 'Invalid Token' })

        // const user = verifyToken(token, process.env.ACCESS_TOKEN_KEY)
        // const storedUser = await User.findOne({ where: { userId: user.userId } })

        const user = req.user;

        const userData = {
            userId: user.userId,
            username: user.username,
            name: user.name,
            gender: user.gender,
            email: user.email,
            phone: user.phone,
        }
        res.status(200).json({ user: userData });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' })
    }
}

module.exports.refresh = async (req, res) => {

    const refreshToken = req.body?.refreshToken;
    try {

        if (!refreshToken)
            return res.status(403).json({ message: 'Invalid Creadentials' });

        let user = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_KEY)

        user = await User.findOne({ where: { userId: user.userId } })

        if (!user)
            return res.status(403).json({ message: 'Invalid Creadentials' });

        const userData = { userId: user.userId, email: user.email }
        const newAccessToken = createToken(userData, process.env.ACCESS_TOKEN_KEY, '5m');
        const newRefreshToken = createToken(userData, process.env.REFRESH_TOKEN_KEY, '1h');

        return res.status(200).json({ message: 'Refresh Successfull', accessToken: newAccessToken, refreshToken: newRefreshToken, user: user })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}