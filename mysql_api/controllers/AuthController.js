import {htmlForgotPasswordEmail, nodemailerTransport} from "../utils/nodemailer.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

const jwt_key = process.env.JWT_KEY;
const host = process.env.DB_HOST;

export default {
    async login(req, res) {
        try {
            const {email, password} = req.body;
            if (!email || !password) {
                return res.status(400).json({error: 'Email e senha são obrigatórios'});
            }
            const user = await UserModel.findOne({where: {email: email}})
            if (!user) {
                return res.status(400).json({error: 'Usuário não cadastrado no sistema'});
            }
            if (!(await bcrypt.compare(password, user.password))) {
                return res.status(400).json({error: 'Senha incorreta'});
            }
            const token = jwt.sign({userId: user.user_id}, jwt_key, {expiresIn: '1y'})
            res.status(200).json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json({error: 'Erro ao realizar login'});
        }
    },

    async updatePassword(req, res) {
        try {
            const user_id = req.user_id
            const {oldPassword, newPassword} = req.body;
            const user = await UserModel.findByPk(user_id);
            if (!user) {
                return res.status(400).json({message: 'Usuário não encontrado'});
            }
            if (!(await bcrypt.compare(oldPassword, user.password))) {
                return res.status(400).json({message: 'Senha atual incorreta'});
            }
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            await UserModel.update({password: hashedPassword}, {where: {user_id: user_id}});
            res.status(200).json({message: 'Senha atualizada com sucesso'});
        } catch (e) {
            console.log(e);
            res.status(400).json({error: 'Erro ao atualizar senha'});
        }
    },

    async sendEmailResetPassword(req, res) {
        try {
            const email = req.body.email;
            if (!email) {
                return res.status(400).json({error: 'Email é obrigatório'});
            }
            const user = await UserModel.findOne({where: {email: email}})
            if (!user) {
                return res.status(400).json({error: 'Usuário não encontrado'});
            }
            const token = jwt.sign({userId: user.user_id}, jwt_key, {expiresIn: '1y'})
            const resetURL = `http://${host}:3001/reset-password?token=${token}`;
            const message = htmlForgotPasswordEmail(email, token, resetURL)
            await nodemailerTransport.sendMail(message)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Erro ao enviar email"})
        }
    }
};
