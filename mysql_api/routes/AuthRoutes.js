const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

router.post("/login", AuthController.login);
router.get("/verifyToken/:token", AuthController.verifyToken);
router.get("/forgot-password/:email", AuthController.sendEmailResetPassword)
router.put("/reset-password/:token", AuthController.updatePassword)

module.exports = router;