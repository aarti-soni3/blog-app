const Address = require("../models/AddressSchema");
const User = require("../models/UserSchema");

module.exports.getUser = async (req, res) => {

    const { id } = req.params;
    try {
        //get user data exclude some fields
        const user = await User.findByPk(id, { attributes: { exclude: ['createdAt', 'updatedAt'] } });
        const address = await Address.findOne({ where: { userId: user.userId }, attributes: { exclude: ['addressId', 'userId', 'createdAt', 'updatedAt', 'user_id'] } });

        return res.status(200).json({ user, address });
    } catch (error) {
        return res.status(500).json({ error })
    }
}

module.exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const userData = {
            name: data?.name,
            username: data?.username,
            gender: data?.gender,
            phone: data?.phone
        }

        const addressData = {
            address: data?.address,
            city: data?.city,
            state: data?.state,
            zip: data?.zip,
        }

        const updatedUser = await User.update(userData, { where: { userId: id } });
        const updatedAddress = await Address.update(addressData, { where: { userId: id } })
        return res.status(200).json({ user: updatedUser, address: updatedAddress });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        await req.user.destroy();
        return res.status(204).json({ message: 'User Deleted!' })
    } catch (error) {
        return res.status(500).json({ error })
    }
}