const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const utils = require("../utils/utils");
require('dotenv').config();
const UserModel = require('../models/UserModel');

const jwt_key = process.env.JWT_KEY;
const mailer_user = process.env.MAILER_USER;
const mailer_pass = process.env.MAILER_PASS;
const host = process.env.HOST;

module.exports = {
    async login(req, res) {
        const {email, password} = req.body;
        console.log(req.body)
        const user = await utils.findUserbyEmail(email);
        if (!user) {
            return res.status(400).json({error: 'Usuário não cadastrado no sistema'});
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({error: 'Senha incorreta'});
        }
        const token = utils.createToken(user, '1h');
        res.status(200).json({token});
    },

    async verifyToken(req, res) {
        try {
            const token = req.params.token;
            jwt.verify(token, jwt_key);
            res.status(200).json({valid: true});
        } catch (error) {
            console.log(error);
            res.status(401).json({valid: false});
        }
    },

    async updatePassword(req, res) {
        try {
            const token = req.params.token;
            if (!token) {
                return res.status(400).json({error: 'Token não informado'});
            }
            const decodedToken = jwt.verify(token, jwt_key);
            if (decodedToken) {
                const userId = decodedToken.userId;
                const user = await UserModel.findByPk(userId);
                if (!user) {
                    return res.status(400).json({error: 'Usuário não encontrado'});
                }
                user.password = await bcrypt.hash(req.body.newPassword, 10);
                //ALTERAR USUARIO DO BANCO
                await UserModel.update({
                    password: user.password
                }, {
                    where: {
                        user_id: userId
                    }
                });
                res.status(200).json({message: 'Senha atualizada com sucesso'});
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({error: 'Erro ao atualizar senha'});
        }
    },


    async sendEmailResetPassword(req, res) {
        const user = await utils.findUserbyEmail(req.params.email);
        console.log(user)
        if (!user) {
            return res.status(400).json({error: 'Usuário não encontrado'});
        }
        const token = utils.createToken(user, '5m');
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: mailer_user,
                pass: mailer_pass
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const resetURL = `http://${host}:3001/reset-password?token=${token}`;
        const message = {
            from: "Opetimize Support <support@opetimize.com>",
            to: req.params.email,
            subject: "Recuperação de senha Opetimize",
            text: "Recuperação de senha",
            html: `<a href="${resetURL}?token=${token}" 
                  style="padding: 1rem 4rem; border-radius: 8px; color: #ffffff; 
                  background: #0C1B33; font-weight: 900; text-decoration: none; 
                  cursor: pointer; font-size: 14px;">REDEFINIR SUA SENHA</a>`
        };

        await transport.sendMail(message, function (err) {
            if (err) {
                return res.status(400).json(err);
            } else {
                return res.status(200).json({message: 'Email enviado com sucesso!'});
            }
        });


    }
};
