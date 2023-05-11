const PurchaseController = require('../controllers/PurchaseController');
const express = require('express');
const router = express.Router();

router.get('/purchases', PurchaseController.getAllPurchases);
router.get('/purchases/:id', PurchaseController.getPurchaseById);
router.post('/purchases', PurchaseController.createPurchase);
router.put('/purchases/:id', PurchaseController.updatePurchaseById);
router.delete('/purchases/:id', PurchaseController.deletePurchaseById);
router.delete('/purchases', PurchaseController.deleteAllPurchases);

module.exports = router;
