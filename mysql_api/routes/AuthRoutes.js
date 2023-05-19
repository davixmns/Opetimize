const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

router.post("/login", AuthController.login);
router.get("/verifyToken/:token", AuthController.verifyToken);
router.get("/resetPassword/:email", AuthController.sendEmailResetPassword)
router.put("/updatePassword", AuthController.updatePassword)

module.exports = router;