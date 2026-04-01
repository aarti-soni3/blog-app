const express = require('express');
const multer = require('multer');
const blogController = require('../controller/blogController');
const router = express.Router();
const { storage } = require('../utils/cloudinaryConfig.js');
const upload = multer({ storage: storage });

router.route('/')
    .get(blogController.getAllBlogs)
    .post(upload.single('image'), blogController.createBlog)

router.route('/:id')
    .get(blogController.getBlog)
    .patch(upload.single('image'), blogController.updateBlog)
    .delete (blogController.deleteBlog);



module.exports = router;