const router = require('express').Router();

const customerRoutes = require('./customers');
const jobRoutes = require('./jobs');
const partRoutes = require('./parts');

router.use('/customers', customerRoutes);
router.use('/jobs', jobRoutes);
router.use('/parts', partRoutes);

module.exports = router;