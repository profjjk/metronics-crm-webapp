const router = require('express').Router();
const userController = require('../../controllers/userController');
const authenticate = require('../../middleware/authenticate');

router.route('/')
    .post(userController.register)
    .get(authenticate.token, userController.findAll)
    .delete(authenticate.token, userController.delete)

router.route('/login')
    .post(authenticate.user, userController.login)

module.exports = router;
