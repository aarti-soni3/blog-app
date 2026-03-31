const User = require("../models/UserSchema");

module.exports.getUser = async (req, res) => {
    const id = req.params.id;

    const user = await User.findByPk(id);

    if (!user)
        return res.status(404).json({ message: 'User not found!' });

    return res.status(200).json({ user });
}

module.exports.getProfile = (req, res) => {

}