import express from "express";
import AuthController from "../controllers/AuthController.js";
import ResetTokenController from "../controllers/ResetTokenController.js";
import NodeMailerController from "../controllers/NodeMailerController.js";
import middleware from "../middlewares/middleware.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/reset-password", ResetTokenController.createResetToken, NodeMailerController.sendResetTokenEmail)
router.post("/verify-reset-token", ResetTokenController.verifyResetToken)
router.post("/verify-jwt", middleware.verifyToken, AuthController.confirmToken)

export default router