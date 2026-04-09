const Blog = require("../models/BlogSchema");
const Category = require("../models/CategorySchema");
const Comment = require("../models/CommentSchema");
const User = require("../models/UserSchema");
const { cloudinary } = require("../utils/cloudinaryConfig");

module.exports.getAllBlogs = async (req, res) => {
    try {
        //find all blogs n send to client with populate user, category,comment data
        const blogs = await Blog.findAll({
            include: [
                { model: User, attributes: ['username', 'userId'] },
                { model: Category, attributes: ['categoryId', 'name'] },
                {
                    model: Comment,
                    attributes: ['commentId', 'description'],
                    include: [{ model: User, attributes: ['userId'] }],
                }
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

    //get single blog details with user, category n comment data
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
        const categoryId = req.categoryId;
        const user = req.user;

        const blog = {
            title: data.title,
            userId: user.userId,
            description: data.description,
            categoryId: categoryId,
            image: { name: file?.filename, url: file?.path }
        }

        const newBlog = await Blog.create({ ...blog });
        return res.status(200).json({ blog: newBlog, message: 'Blog created!' })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const file = req.file;
        const categoryId = req.categoryId;
        const blog = req.blog;

        const updatedData = {
            title: data.title,
            description: data.description,
            categoryId: categoryId,
        }

        //check delete image or not
        const isDeleteImage = data.isDeleteImage === 'true'
        if (isDeleteImage) {
            await cloudinary.uploader.destroy(blog?.image?.name);
            updatedData.image = { name: "", url: "" }
        }

        //if file exist delete image n upload new
        if (file) {
            await cloudinary.uploader.destroy(blog?.image?.name);
            updatedData.image = { name: file?.filename, url: file.path }
        }

        const updatedBlog = await Blog.update(updatedData, { where: { blogId: id } });
        return res.status(200).json({ message: 'Blog Updated!', blog: updatedBlog })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.deleteBlog = async (req, res) => {

    const id = req.params.id;
    const blog = req.blog;

    try {
        //delete blog image first then delete blog
        if (blog?.image?.name)
            await cloudinary.uploader.destroy(blog?.image?.name);
        const rowsAffected = await Blog.destroy({ where: { blogId: id } });

        if (rowsAffected === 0)
            return res.status(404).json({ message: 'Unable to delete blog' });

        return res.status(200).json({ message: 'Blog Deleted!' });

    } catch (error) {
        return res.status(500).json({ error });
    }
}