const router = require('express').Router();
const authController = require('../../controllers/authController');
const authenticate = require('../../middleware/authenticate');

router.route('/login')
    .post(authenticate.user, authController.login)

router.route('/register')
    .post(authenticate.token, authController.register)

module.exports = router;
