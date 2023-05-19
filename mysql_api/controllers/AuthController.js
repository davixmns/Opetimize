const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const utils = require("../utils/utils");
const {getUserById} = require("./UserController");
require('dotenv').config();

const jwt_key = process.env.JWT_KEY;
const mailer_user = process.env.MAILER_USER
const mailer_pass = process.env.MAILER_PASS

module.exports = {
    async login(req, res) {
        const {email, password} = req.body;
        const user = utils.findUserbyEmail(email)
        if (!user) {
            return res.status(400).json({error: 'Usuário não cadastrado no sistema'});
        }
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).json({error: 'Senha incorreta'});
        }
        const token = utils.createToken(user, '1h')
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
            const token = req.body.token;
            if (!token) {
                return res.status(400).json({ error: 'Token não informado' });
            }

            const decodedToken = await this.verifyToken(token);
            if (decodedToken) {
                const userId = decodedToken.user_id;
                const user = getUserById(userId)
                if (!user) {
                    return res.status(400).json({ error: 'Usuário não encontrado' });
                }
                user.password = await bcrypt.hash(req.body.password, 10);
                res.status(200).json({ message: 'Senha atualizada com sucesso' });
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({ error: 'Erro ao atualizar senha' });
        }
    },


    sendEmailResetPassword(req, res) {
        const user = utils.findUserbyEmail(req.params.email);
        if (user) {
            const token = utils.createToken(user, '1h');

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

            const resetURL = `localhost:3001/reset-password?token=${token}`; // Substitua "example.com" pelo seu domínio ou URL adequada
            const message = {
                from: "Opetimize Support <support@opetimize.com>",
                to: req.body.email,
                subject: "Recuperação de senha Opetimize",
                text: "",
                html: `<p>Clique <a href="${resetURL}">aqui</a> para recuperar sua senha Opetimize</p>`
            };


            transport.sendMail(message, function (err) {
                if (err) {
                    return res.status(400).json(err);
                } else {
                    return res.status(200).json({message: 'Email enviado com sucesso!'});
                }
            });
        }
    }



}