import express from "express";
import AuthController from "../controllers/AuthController.js";
import ResetTokenController from "../controllers/ResetTokenController.js";
import NodeMailerController from "../controllers/NodeMailerController.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/reset-password", ResetTokenController.createResetToken, NodeMailerController.sendResetTokenEmail)

export default router