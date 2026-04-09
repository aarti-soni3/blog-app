const express = require('express');
const commentController = require('../controller/commentController');
const { validate } = require('../utils/validationUtility');
const { createCommentSchema, updateCommentSchema } = require('../validations/commentSchema');
const { isLoggedIn, isCommentAuthor } = require('../middlewares');
const router = express.Router();

//middleware isLoggedin for protected path can access only if user is avilable
//middleware validate first check data is matching all validation then allow to next
//middleware isCommentAuthor : only allow owner of comment for changes

router.route('/').post(isLoggedIn, validate(createCommentSchema), commentController.createComment);

router.route('/:id')
    .patch(isLoggedIn, isCommentAuthor, validate(updateCommentSchema), commentController.updateComment)
    .delete(isLoggedIn, isCommentAuthor, commentController.deleteComment);

module.exports = router