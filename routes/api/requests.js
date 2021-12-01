const router = require('express').Router();
const requestController = require('../../controllers/requestController');
const authenticate = require('../../middleware/authenticate');

router.route('/')
    .get(authenticate.token, requestController.findAll)

router.route('/:id')
    .delete(authenticate.token, requestController.delete)

module.exports = router;