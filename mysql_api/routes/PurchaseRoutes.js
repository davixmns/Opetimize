import PurchaseController from '../controllers/PurchaseController.js';
import express from "express";

const router = express.Router();

router.get('/users/:token/purchases', PurchaseController.getAllPurchasesByUserId);
router.post('/purchases/:token', PurchaseController.createPurchase);
router.put('/purchases/:id', PurchaseController.updatePurchaseById);
router.delete('/purchases/:id', PurchaseController.deletePurchaseById);

export default router;