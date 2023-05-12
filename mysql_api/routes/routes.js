const express = require('express');
const router = express.Router();

router.use('/', require('./UserRoutes'));
router.use('/', require('./PurchaseRoutes'));
router.use('/', require('./PetRoutes'));
router.use('/', require('./AuthRoutes'));

module.exports = router;




