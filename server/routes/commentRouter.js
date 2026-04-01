const express = require('express');
const commentController = require('../controller/commentController');
const router = express.Router();

router.route('/').post(commentController.createComment);

router.route('/:id')
    .patch(commentController.updateComment)
    .delete(commentController.deleteComment);



module.exports = router