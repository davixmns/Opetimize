import PurchaseController from '../controllers/PurchaseController.js';
import express from "express";
import middleware from "../middlewares/middleware.js";

const router = express.Router();

router.get('/purchases', middleware.verifyToken, PurchaseController.getAllPurchases);
router.post('/purchase', middleware.verifyToken, PurchaseController.createPurchase);
router.put('/purchase', middleware.verifyToken, PurchaseController.updatePurchase);
router.delete('/purchase/:purchase_id', middleware.verifyToken, PurchaseController.deletePurchase);

export default router;