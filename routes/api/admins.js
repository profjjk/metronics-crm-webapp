const router = require('express').Router();
const adminController = require('../../controllers/adminController');
const authenticate = require('../../middleware/authenticate');

router.route('/')
    .get(authenticate.token, adminController.findOne)
    .post(adminController.create)

router.route('/login')
    .post(adminController.login)

module.exports = router;