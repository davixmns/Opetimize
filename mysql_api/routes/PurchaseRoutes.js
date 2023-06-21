const PurchaseController = require('../controllers/PurchaseController');
const express = require('express');
const router = express.Router();

router.get('/users/:token/purchases', PurchaseController.getAllPurchasesByUserId);
router.post('/purchases/:token', PurchaseController.createPurchase);
router.put('/purchases/:id', PurchaseController.updatePurchaseById);
router.delete('/purchases/:id', PurchaseController.deletePurchaseById);

module.exports = router;
