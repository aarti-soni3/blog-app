const express = require('express');
const multer = require('multer');
const blogController = require('../controller/blogController');
const router = express.Router();
const { storage } = require('../utils/cloudinaryConfig.js');
const { validate } = require('../utils/validationUtility.js');
const { createBlogSchema, updateBlogSchema } = require('../validations/blogSchema');
const { isLoggedIn, isBlogAuthor } = require('../middlewares/index.js');
const upload = multer({ storage: storage });

router.route('/')
    .get(blogController.getAllBlogs)
    .post(isLoggedIn, upload.single('image'), validate(createBlogSchema), blogController.createBlog)

router.route('/:id')
    .get(blogController.getBlog)
    .patch(isLoggedIn, isBlogAuthor, upload.single('image'), validate(updateBlogSchema), blogController.updateBlog)
    .delete(isLoggedIn, isBlogAuthor, blogController.deleteBlog);

module.exports = router;