import express from "express";
import AuthController from "../controllers/AuthController.js";
import middleware from "../middlewares/middleware.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.get("/forgot-password/:email", AuthController.sendEmailResetPassword)
router.put("/update-password", middleware.verifyToken, AuthController.updatePassword)

export default router