const router = require('express').Router();
const userController = require('../../controllers/userController');
const authenticate = require('../../middleware/authenticate');

router.route('/')
    .get(authenticate.token, userController.findAll)

router.route('/:id')
    .get(authenticate.token, userController.findById)
    .put(authenticate.token, userController.updateById)
    .delete(authenticate.token, userController.delete)

module.exports = router;