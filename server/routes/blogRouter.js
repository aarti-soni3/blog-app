const express = require('express');
const blogController = require('../controller/blogController');
const router = express.Router();

router.route('/').get(blogController.getAllBlogs)

router.route('/blog').get(blogController.getBlog)

module.exports = router;