const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();

router.route('/login').post(authController.login);

router.route('/logout').post(authController.logout);

router.route('/register').post(authController.register);

module.exports = router;