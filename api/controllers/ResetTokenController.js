import UserModel from "../models/UserModel.js";
import crypto from "crypto";
import utils from "../utils/utils.js";
import ResetTokenModel from "../models/ResetTokenModel.js";
import {where} from "sequelize";

function createRandomString(length) {
    const bytes = crypto.randomBytes(Math.ceil(length / 2));
    return bytes.toString('hex').slice(0, length);
}

const fiveMinutes = 5 * 60 * 1000

export default {
    async createResetToken(req, res, next) {
        try {
            const userEmail = req.body.email
            if (!utils.emailRegex.test(userEmail)) return res.status(400).json({message: 'Email inválido'})
            const user = await UserModel.findOne({where: {email: userEmail}})
            if (!user) return res.status(404).json({message: 'Conta não cadastrada!'})
            const newResetToken = createRandomString(4).toUpperCase()
            const resetTokenExists = await ResetTokenModel.findByPk(user.user_id)
            if (resetTokenExists) {
                await resetTokenExists.update({token: newResetToken})
            } else {
                await ResetTokenModel.create({user_id: user.user_id, token: newResetToken})
            }
            req.reset_token = newResetToken
            req.user = user
            next()
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Erro ao criar código'})
        }
    },

    async verifyResetToken(req, res){
        try{
            const {token, email} = req.body
            if(token.length !== 4) return res.status(400).json({message: 'Código inválido'})
            const user = await UserModel.findOne({email: email})
            if(!user) return res.status(404).json({message: 'Usuário não encontrado'})
            const resetToken = await ResetTokenModel.findByPk(user.user_id)
            if(!resetToken) return res.status(404).json({message: 'Código não encontrado'})
            if(resetToken.token !== token) return res.status(400).json({message: 'Código inválido'})
            const now = new Date()
            const tokenDate = new Date(resetToken.updatedAt)
            if(now.getTime() - tokenDate.getTime() > fiveMinutes) return res.status(400).json({message: 'Código expirado'})
            const jwt = await utils.signJWT(user.user_id)
            return res.status(200).json({message: 'Código válido', jwt: jwt})
        }catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Erro ao verificar código'})
        }
    }
}