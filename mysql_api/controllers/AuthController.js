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
        const token = jwt.sign({userId: user.user_id}, jwt_key, {expiresIn: '1h'});

        res.status(200).json({token});
    },
}