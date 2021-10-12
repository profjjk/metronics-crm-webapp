const router = require('express').Router();
const jobController = require('../../controllers/jobController');
const authenticate = require('../../middleware/authenticate');

router.route('/')
    .get(authenticate.token, jobController.findAll)
    .post(authenticate.token, jobController.create);

router.route('/:id')
    .get(authenticate.token, jobController.findById)
    .put(authenticate.token, jobController.updateById)
    .delete(authenticate.token, jobController.delete);

router.route('/clear/:id')
    .delete(authenticate.token, jobController.deleteMany);


module.exports = router;
