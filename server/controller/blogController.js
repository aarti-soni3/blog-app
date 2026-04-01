const Blog = require("../models/BlogSchema");
const Category = require("../models/CategorySchema");
const Comment = require("../models/CommentSchema");
const User = require("../models/UserSchema");
const { getAuthToken, verifyToken } = require("../utils/TokenUtility");

module.exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: [
                { model: User, attributes: ['username', 'userId'] },
                { model: Category, attributes: ['categoryId', 'name'] }
            ]
        });

        if (!blogs) {
            return res.json({ message: 'No blogs available!' });
        }

        return res.json({ blogs: blogs });
    } catch (error) {
        return res.json({ message: error.message });
    }
}

module.exports.getBlog = async (req, res) => {
    const id = req.params.id;

    try {
        const blog = await Blog.findByPk(id, {
            include: [
                { model: User, attributes: ['userId', 'username'] },
                { model: Category, attributes: ['categoryId', 'name'] },
                {
                    model: Comment,
                    attributes: ['commentId', 'description', 'createdAt'],
                    include: [{ model: User, attributes: ['userId', 'username'] }],
                    order: [['createdAt', 'DESC']]
                }
            ]
        });

        if (!blog)
            return res.status(404).json({ message: 'no blog found!' });

        return res.status(200).json({ blog })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports.createBlog = async (req, res) => {
    try {
        const data = req.body;
        const file = req.file;

        const token = getAuthToken(req);
        const decodeUser = verifyToken(token, process.env.ACCESS_TOKEN_KEY);
        const user = await User.findByPk(decodeUser.userId);
        const category = await Category.findOne({ where: { name: data.category } });

        const blog = {
            title: data.title,
            userId: user.userId,
            description: data.description,
            category_id: category.categoryId,
            image: file.path
        }

        const newBlog = await Blog.create({ ...blog });

        if (!newBlog)
            return res.status(404).json({ message: 'not added' });

        return res.status(200).json({ message: 'Blog created!' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}

module.exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const file = req.file;

        const category = await Category.findOne({ where: { name: data.category } });
        if (!category) return res.status(400).json({ message: "Invalid Category" });

        const updatedData = {
            title: data.title,
            description: data.description,
            categoryId: category.categoryId,
        }

        if (data.isDeleteImage)
            updatedData.image = null

        if (file)
            updatedData.image = file.path

        const [rowsAffected] = await Blog.update(updatedData, { where: { blogId: id } });

        if (rowsAffected === 0)
            return res.status(404).json({ message: 'Blog not found or no Changes Made!' });

        return res.status(200).json({ message: 'Blog Updated!' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}

module.exports.deleteBlog = async (req, res) => {

    const id = req.params.id;

    console.log('id: ', id)

    if (id === undefined || id === null)
        return res.status(404).json({ error: { message: 'Invalid Id' } })

    const rowsAffected = await Blog.destroy({ where: { blogId: id } });

    if (rowsAffected === 0)
        return res.status(404).json({ message: 'Unable to delete blog' });

    return res.status(200).json({ message: 'Blog Deleted!' });
}