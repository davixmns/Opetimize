const express = require('express');
const router = express.Router();

router.use('/users', require('./UserRoutes'));
router.use('/purchases', require('./PurchaseRoutes'));
router.use('/pets', require('./PetRoutes'));

module.exports = router;




