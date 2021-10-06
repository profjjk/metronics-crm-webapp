const router = require('express').Router();

const customerRoutes = require('./customers');
const jobRoutes = require('./jobs');
const partRoutes = require('./parts');
const adminRoutes = require('./admins');

router.use('/customers', customerRoutes);
router.use('/jobs', jobRoutes);
router.use('/parts', partRoutes);
router.use('/admin', adminRoutes);

module.exports = router;