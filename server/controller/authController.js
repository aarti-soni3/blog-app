const User = require('../models/UserSchema');
const { verifyHashedPassword } = require('../utils/hashedPasswordUtility');
module.exports.register = async (req, res) => {
    const user = req.body;
    const userData = {
        name: user.name,
        username: user.username,
        gender: user.gender,
        phone: user.phone,
        email: user.email,
        password: user.password,
        address: user.address,
    }
    try {
        if (!user)
            return res.status(404).json({ message: 'Bad Request' })
        const newUser = await User.create({ ...userData });

        console.log('user created : ', newUser.toJSON())
        return res.status(201).json({ message: 'User Registered Successfully!', user: newUser })

    } catch (error) {
        console.log('error in creating user :', error.message)
        return res.status(403).json({ message: error.message })
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

    if (isMatched)
        return res.status(200).json({ message: 'Logged in Successfully!', user: loggedinUser })

    res.status(401).json({ message: 'Email or Password is invalid' })
}

module.exports.logout = async (req, res) => {



}
