const Address = require("../models/AddressSchema");
const User = require("../models/UserSchema");

module.exports.getUser = async (req, res) => {
    const id = req.params.id;

    const user = await User.findByPk(id, { attributes: { exclude: ['createdAt', 'updatedAt'] } });

    if (!user)
        return res.status(404).json({ message: 'User not found!' });

    const address = await Address.findOne({ where: { userId: user.userId }, attributes: { exclude: ['addressId', 'userId', 'createdAt', 'updatedAt', 'user_id'] } });

    if (!address)
        return res.status(404).json({ message: 'Address not found!' });

    return res.status(200).json({ user, address });
}

module.exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const user = await User.findByPk(id);
    const address = await Address.findOne({ where: { userId: id } });

    if (!user /*|| !address*/)
        return res.status(404).json({ message: /*!user ?*/ 'User not found!'/* : 'Address not found!'*/ })

    const userData = {
        name: data.name,
        username: data.username,
        gender: data.gender,
        phone: data.phone
    }

    const addressData = {
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
    }

    const updatedUser = await User.update(userData, { where: { userId: id } });
    const updatedAddress = await Address.update(addressData, { where: { userId: id } })
    return res.status(200).json({ user: updatedUser, address: updatedAddress });

}

module.exports.deleteUser = async (req, res) => {

    const id = req.params.id;
    console.log(id);

    return res.status(200).json({ message: 'User Deleted!' })
}