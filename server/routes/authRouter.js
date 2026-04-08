const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { validate } = require('../utils/validationUtility');
const { registerSchema, loginSchema } = require('../validations/validationSchema');
const { isLoggedIn } = require('../middlewares');

router.route('/access').get(isLoggedIn, authController.authenticateUserOnRefresh);

router.route('/refresh').post(authController.refresh);

router.route('/login').post(validate(loginSchema), authController.login);

router.route('/logout').post(authController.logout);

router.route('/register').post(validate(registerSchema), authController.register);

module.exports = router;