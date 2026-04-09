const Address = require('../models/AddressSchema');
const User = require('../models/UserSchema');
const { verifyHashedPassword } = require('../utils/hashedPasswordUtility');
const { createToken, verifyToken } = require('../utils/TokenUtility');
module.exports.register = async (req, res) => {
    const user = req.body;
    try {
        if (!user)
            return res.status(404).json({ message: 'Invalid data' })

        const userData = {
            name: user?.name,
            username: user?.username,
            gender: user?.gender,
            phone: user?.phone,
            email: user?.email,
            password: user?.password,
        }

        // find user
        const existingUser = await User.findOne({ where: { email: user.email } });

        //if exist return res 
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

        //create token object,accesstoken & refresh token
        const userTokenObject = { userId: newUser.userId, email: newUser.email }
        const newAccessToken = createToken(userTokenObject, process.env.ACCESS_TOKEN_KEY, '1h');
        const newRefreshToken = createToken(userTokenObject, process.env.REFRESH_TOKEN_KEY, '30d');

        return res.status(201).json({ message: 'User Registered Successfully!', user: newUser, accessToken: newAccessToken, refreshToken: newRefreshToken })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports.login = async (req, res) => {

    const user = req.body;
    try {
        if (!user.email || !user.password)
            return res.status(400).json({ message: 'Invalid Data' })

        //find user
        const loggedinUser = await User.scope('withPassword').findOne({ where: { email: user.email } });

        // if not exist return res
        if (!loggedinUser)
            return res.status(401).json({ message: 'Email or Password is invalid' })

        //if user exist verify password
        const isMatched = await verifyHashedPassword(user.password, loggedinUser.password)

        //if valid password generate token
        if (isMatched) {
            const userData = { userId: loggedinUser.userId, email: loggedinUser.email }
            const newAccessToken = createToken(userData, process.env.ACCESS_TOKEN_KEY, '1h');
            const newRefreshToken = createToken(userData, process.env.REFRESH_TOKEN_KEY, '30d');

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

    //verify token n send user data
    try {
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

        //if no token then return
        if (!refreshToken)
            return res.status(403).json({ message: 'Invalid Creadentials' });

        //verify token 
        let user = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_KEY)

        // find decoded user 
        user = await User.findOne({ where: { userId: user.userId } })

        // if not user return res
        if (!user)
            return res.status(403).json({ message: 'Invalid Creadentials' });

        //create data and send to client
        const userData = { userId: user.userId, email: user.email }
        const newAccessToken = createToken(userData, process.env.ACCESS_TOKEN_KEY, '1h');
        const newRefreshToken = createToken(userData, process.env.REFRESH_TOKEN_KEY, '30d');

        return res.status(200).json({ message: 'Refresh Successfull', accessToken: newAccessToken, refreshToken: newRefreshToken, user: user })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}