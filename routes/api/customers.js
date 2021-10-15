const router = require('express').Router();
const customerController = require('../../controllers/customerController');
const authenticate = require('../../middleware/authenticate');

router.route('/')
    .get(authenticate.token, customerController.findAll)
    .post(authenticate.token, customerController.create)

router.route('/:id')
    .get(authenticate.token, customerController.findById)
    .put(authenticate.token, customerController.updateById)
    .delete(authenticate.token, customerController.delete)

module.exports = router;
