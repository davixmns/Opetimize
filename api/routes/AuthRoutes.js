import express from "express";
import AuthController from "../controllers/AuthController.js";
import middleware from "../middlewares/middleware.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/reset-password", AuthController.sendEmailResetPassword)
router.get("/verify-jwt", middleware.verifyToken, AuthController.allowUser)

export default router