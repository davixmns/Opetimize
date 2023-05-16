const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = {
    async login(req, res) {
        const {email, password} = req.body;
        const user = await UserModel.findOne({where: {email}});
        if (!user) {
            return res.status(400).json({error: 'Usuário não cadastrado no sistema'});
        }
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).json({error: 'Senha incorreta'});
        }
        const jwt_key = process.env.JWT_KEY;
        const token = jwt.sign({userId: user.user_id}, jwt_key, {expiresIn: '10s'});
        res.status(200).json({token});
    },

    async verifyToken(req, res) {
        try {
            const token = req.params.token;
            const jwt_key = process.env.JWT_KEY;
            jwt.verify(token, jwt_key);
            res.status(200).json({ valid: true });
        } catch (error) {
            console.log(error);
            res.status(401).json({ valid: false });
        }
    }

}