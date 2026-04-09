const Comment = require("../models/CommentSchema");

module.exports.createComment = async (req, res) => {

    const data = req.body;

    try {
        const user = req.user;
        const commentData = {
            blogId: data.id,
            userId: user.userId,
            description: data.description,
        }

        const comment = await Comment.create({ ...commentData });
        return res.status(200).json({ comment, message: 'comment created!' })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.updateComment = async (req, res) => {

    const id = req.params.id;
    const data = req.body;

    try {
        await Comment.update({ description: data.description }, { where: { commentId: id } });

        return res.status(200).json({ message: 'comment Updated!' })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const rowsAffected = await Comment.destroy({ where: { commentId: id } });
        if (rowsAffected === 0)
            return res.status(404).json({ message: 'Unable to delete Comment' });

        return res.status(200).json({ message: 'Comment Deleted!' });
    } catch (error) {
        return res.status(500).json({ error })
    }
}