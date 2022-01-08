const router = require('express').Router();

const customerRoutes = require('./customers');
const jobRoutes = require('./jobs');
const partRoutes = require('./parts');
const messageRoutes = require('./messages');
const requestRoutes = require('./requests');
const userRoutes = require('./users');
const authRoutes = require('./auth');

router.use('/customers', customerRoutes);
router.use('/jobs', jobRoutes);
router.use('/parts', partRoutes);
router.use('/messages', messageRoutes);
router.use('/requests', requestRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;