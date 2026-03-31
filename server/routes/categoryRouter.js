const express = require('express');
const categoryController = require('../controller/categoryController');
const router = express.Router();

router.route('/').get(categoryController.getAllCategory)

router.route('/:id').get(categoryController.getCategory)

module.exports = router;