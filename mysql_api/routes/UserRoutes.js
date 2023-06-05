const UserController = require('../controllers/UserController')
const express = require('express')
const router = express.Router()

router.post('/users', UserController.createUser)
router.get('/users/:id', UserController.getUserById)
router.put('/users/:id', UserController.updateUserById)
router.delete('/users/:id', UserController.deleteUserById)
router.delete('/users', UserController.deleteAllUsers)
router.get('/users/:email', UserController.getUserByEmail)
router.get('/getUserByToken/:token', UserController.getUserByToken)

module.exports = router
