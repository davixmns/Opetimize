import express from "express";
import AuthRoutes from "./AuthRoutes.js"
import UserRoutes from "./UserRoutes.js"
import PurchaseRoutes from "./PurchaseRoutes.js"

const router = express.Router();

router.use(AuthRoutes)
router.use(UserRoutes)
router.use(PurchaseRoutes)

export default router;







