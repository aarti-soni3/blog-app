const User = require("../models/UserSchema");
const Blog = require("../models/BlogSchema");
const Comment = require("../models/CommentSchema");

const { getAuthToken, verifyToken } = require("../utils/TokenUtility")

module.exports.isLoggedIn = async (req, res, next) => {
    try {
        //get token
        const token = getAuthToken(req);

        if (!token)
            return res.status(400).json({ message: "you're not logged in!" })

        //verify token & find user
        const decodeUser = verifyToken(token, process.env.ACCESS_TOKEN_KEY)
        const user = await User.findByPk(decodeUser?.userId);

        if (!user)
            return res.status(404).json({ message: 'User not found!' })

        //if user exist add to req object
        req.user = user;

        next();

    } catch (error) {
        return res.status(500).json({ error })
    }
}

module.exports.isBlogAuthor = async (req, res, next) => {

    const id = req.params.id;

    if (id === undefined || id === null)
        return res.status(404).json({ message: 'Invalid Id' })

    //find blog first
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(400).json({ message: "Blog not found!" });

    // if user is not same then dont allow to change
    if (req?.user?.userId !== blog.userId)
        return res.status().json({ message: "You don't have permission" });

    //add blog to req object if available
    req.blog = blog
    next();
}

module.exports.isCommentAuthor = async (req, res, next) => {
    const id = req.params.id;

    if (id === undefined || id === null)
        return res.status(404).json({ message: 'Invalid Id' })

    //find comment
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(400).json({ message: "Comment not found!" });

    //check is owner of comment
    if (req?.user?.userId !== comment.userId)
        return res.status().json({ message: "You don't have permission to change" });

    //add if have permission
    req.comment = comment
    next();
}

module.exports.isAccountOwner = async (req, res, next) => {

    const { id } = req.params;

    if (id === undefined || id === null)
        return res.status(404).json({ message: 'Invalid Id' })

    //find user
    const user = await User.findByPk(id);
    if (!user)
        return res.status(404).json({ message: 'User not found!' })

    //chekck is it owner
    if (req.user.userId !== user.userId)
        return res.status(403).json({ message: 'You dont have permission to change' })

    next();
}