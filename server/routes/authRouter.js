const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();

router.route('/access').get(authController.authenticateUserOnRefresh);

router.route('/refresh').post(authController.refresh);

router.route('/login').post(authController.login);

router.route('/logout').post(authController.logout);

router.route('/register').post(authController.register);

module.exports = router;