const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { validate } = require('../utils/validationUtility');
const { registerSchema, loginSchema } = require('../validations/validationSchema');
const { isLoggedIn } = require('../middlewares');

//middleware isLoggedin for protected path can access only if user is avilable
//middleware validate first check data is matching all validation then allow to next

router.route('/access').get(isLoggedIn, authController.authenticateUserOnRefresh);

router.route('/refresh').post(authController.refresh);

router.route('/login').post(validate(loginSchema), authController.login);

router.route('/logout').post(authController.logout);

router.route('/register').post(validate(registerSchema), authController.register);

module.exports = router;