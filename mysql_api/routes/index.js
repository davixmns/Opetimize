const {UserRoutes} = require('UserRoutes');
const PurchaseRoutes = require('PurchaseRoutes');
const PetRoutes = require('PetRoutes');
const express = require('express');
const router = express.Router();

router.use('/users', UserRoutes);
router.use('/purchases', PurchaseRoutes);
router.use('/pets', PetRoutes);

module.exports = router;
