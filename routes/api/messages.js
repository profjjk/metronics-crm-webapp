const router = require('express').Router();
const messageController = require('../../controllers/messageController');
const authenticate = require('../../middleware/authenticate');

router.route('/')
    .get(authenticate.token, messageController.findAll)

router.route('/:id')
    .delete(authenticate.token, messageController.delete)

module.exports = router;