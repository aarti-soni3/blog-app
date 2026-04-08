const express = require('express');
const userController = require('../controller/userController');
const { isLoggedIn, isAccountOwner } = require('../middlewares');
const router = express.Router();

router.route('/:id')
    .get(isLoggedIn, isAccountOwner, userController.getUser)
    .patch(isLoggedIn, isAccountOwner, userController.updateUser)
    .delete(isLoggedIn, isAccountOwner, userController.deleteUser);

module.exports = router;