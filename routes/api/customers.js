const router = require('express').Router();
const customerController = require('../../controllers/customerController');

router.route('/').get(customerController.findAllCustomers);
router.route('/:id').get(customerController.findByCustomerId);
router.route('/job/:id').get(customerController.findByJobId);
router.route('/job/new/:id').put(customerController.addJob);
router.route('/job/update/:id').put(customerController.updateJob);
router.route('/job/remove/:id').put(customerController.removeJob);

module.exports = router;