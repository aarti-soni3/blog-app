const express = require('express');
const commentController = require('../controller/commentController');
const { validate } = require('../utils/validationUtility');
const { createCommentSchema, updateCommentSchema } = require('../validations/commentSchema');
const { isLoggedIn, isCommentAuthor } = require('../middlewares');
const router = express.Router();

router.route('/').post(isLoggedIn, validate(createCommentSchema), commentController.createComment);

router.route('/:id')
    .patch(isLoggedIn, isCommentAuthor, validate(updateCommentSchema), commentController.updateComment)
    .delete(isLoggedIn, isCommentAuthor, commentController.deleteComment);

module.exports = router