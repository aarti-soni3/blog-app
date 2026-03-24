const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();

router.route('/login').post(authController.login);

router.route('/logout').post(authController.logout);

router.route('/registration').post(authController.registration);

module.exports = router;