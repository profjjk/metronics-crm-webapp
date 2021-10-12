const router = require('express').Router();

const customerRoutes = require('./customers');
const jobRoutes = require('./jobs');
const partRoutes = require('./parts');
const userRoutes = require('./users');

router.use('/customers', customerRoutes);
router.use('/jobs', jobRoutes);
router.use('/parts', partRoutes);
router.use('/user', userRoutes);

module.exports = router;