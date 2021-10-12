const router = require('express').Router();
const authController = require('../../controllers/authController');
const authenticate = require('../../middleware/authenticate');

router.route('/')
    .post(authenticate.user, authController.login)

router.route('/new')
    .post(authenticate.token, authController.register)

module.exports = router;
