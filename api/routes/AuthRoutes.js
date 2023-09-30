import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/reset-password", AuthController.sendEmailResetPassword)

export default router