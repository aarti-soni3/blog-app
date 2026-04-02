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
            blogId: data.id,
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

module.exports.updateComment = async (req, res) => {

    const id = req.params.id;
    const data = req.body;

    try {
        const existingComment = await Comment.findByPk(id);

        if (!existingComment)
            return res.status(404).json({ error: { message: 'Comment not found!' } })

        let token = req.headers['authorization'];

        if (!token)
            return res.status(401).json({ message: 'Invaliad Token' });

        token = token.split(" ")[1];
        const decodeUser = verifyToken(token, process.env.ACCESS_TOKEN_KEY);
        const user = await User.findByPk(decodeUser.userId);

        if (user.userId !== existingComment.userId)
            return res.status(404).json({ error: { message: 'User not found' } });

        const comment = await Comment.update({ description: data.description }, { where: { commentId: id } });
        console.log(comment)

        return res.status(200).json({ message: 'comment Updated!' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}

module.exports.deleteComment = async (req, res) => {

    const id = req.params.id;

    if (id === undefined || id === null)
        return res.status(404).json({ error: { message: 'Invalid Id' } })

    const rowsAffected = await Comment.destroy({ where: { commentId: id } });

    if (rowsAffected === 0)
        return res.status(404).json({ message: 'Unable to delete Comment' });

    return res.status(200).json({ message: 'Comment Deleted!' });
}