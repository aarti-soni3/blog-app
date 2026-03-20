const express = require('express');
const postController = require('../controller/postController');
const router = express.Router();

router.route('/').get(postController.getAllPosts)


router.route('/post').get(postController.getPost)

module.exports = router;