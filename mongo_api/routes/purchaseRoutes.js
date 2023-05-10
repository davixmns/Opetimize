const express = require("express");
const purchaseController = require("../controllers/purchaseController");
const router = express.Router();

router.get("/purchases", purchaseController.getAllPurchases);
router.get("/purchases/:id", purchaseController.getPurchaseById);
router.post("/purchases", purchaseController.createPurchase);
router.put("/purchases/:id", purchaseController.updatePurchaseById);
router.delete("/purchases/:id", purchaseController.deletePurchaseById);
router.delete("/purchases", purchaseController.deleteAllPurchases);

module.exports = router;
