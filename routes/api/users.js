const router = require('express').Router();
const userController = require('../../controllers/userController');
const authenticate = require('../../middleware/authenticate');

router.route('/')
    .get(authenticate.token, userController.findAll)

router.route('/:username')
    .get(authenticate.token, userController.findOne)
    .put(authenticate.token, userController.update)
    .delete(authenticate.token, userController.delete)

module.exports = router;