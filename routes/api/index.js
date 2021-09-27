const router = require('express').Router();

const customerRoutes = require('./customers');
const partRoutes = require('./parts')

router.use('/customers', customerRoutes);
router.use('/parts', partRoutes);

module.exports = router;