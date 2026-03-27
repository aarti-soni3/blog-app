const Blog = require("../models/BlogSchema")

module.exports.getAllBlogs = async (req, res) => {

    try {
        const blogs = await Blog.findAll();

        return res.json({ blogs: blogs });
    } catch (error) {

    }

    return res.json({})
}

module.exports.getBlog = (req, res) => {

}