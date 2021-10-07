const router = require('express').Router();
const jobController = require('../../controllers/jobController');
const authenticate = require('../../middleware/authenticate');

router.route('/')
    .get(jobController.findAll)
    .post(jobController.create);

router.route('/:id')
    .get(jobController.findById)
    .put(jobController.updateById)
    .delete(jobController.delete);

router.route('/many/:id')
    .delete(jobController.deleteMany);


module.exports = router;
