const Comment = require("../models/CommentSchema");
const User = require("../models/UserSchema");
const { verifyToken } = require("../utils/TokenUtility");

module.exports.createComment = async (req, res) => {

    const data = req.body;

    try {
        let token = req.headers['authorization'];

        if (!token)
            return res.status(401).json({ message: 'Invaliad Token' });

        token = token.split(" ")[1];
        const decodeUser = verifyToken(token, process.env.ACCESS_TOKEN_KEY);
        const user = await User.findByPk(decodeUser.userId);

        const commentData = {
            blogId: data.blogId,
            userId: user.userId,
            description: data.description,
        }

        const comment = await Comment.create({ ...commentData });
        console.log(comment, commentData)

        return res.status(200).json({ message: 'comment created!' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}

module.exports.getComments = async (req, res) => {

    try {

    } catch (error) {
        console.log(error)
    }

    return res.status(200).json({ comment: '' });
}