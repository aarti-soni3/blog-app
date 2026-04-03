const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser);

module.exports = router;