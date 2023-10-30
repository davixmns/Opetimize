import middleware from '../middlewares/middleware.js'
import express from 'express'
import UserController from "../controllers/UserController.js";

const router = express.Router()

//ROTAS PUBLICAS
router.post('/user', UserController.createUser)

//ROTAS PRIVADAS
router.put('/user', middleware.verifyToken, UserController.updateUser)
router.delete('/user', middleware.verifyToken, UserController.deleteUser)
router.get('/user', middleware.verifyToken, UserController.getUserData)
router.put('/password', middleware.verifyToken, UserController.updatePassword)
router.put('/new-password', middleware.verifyToken, UserController.createNewPassword)

export default router
