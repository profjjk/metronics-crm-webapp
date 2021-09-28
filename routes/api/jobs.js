const router = require('express').Router();
const jobController = require('../../controllers/jobController');

router.route('/')
    .get(jobController.findAll)
    .post(jobController.create)

router.route('/:id')
    .get(jobController.findById)
    .put(jobController.updateById)
    .delete(jobController.delete)


module.exports = router;