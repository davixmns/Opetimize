const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel')

module.exports = {
    async login(req, res){
        const {email, password} = req.body
        const user = await UserModel.findOne({where: {email}})
        if(!user){
            return res.status(400).json({error: 'Usuário não cadastrado no sistema'})
        }
        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).json({error: 'Senha incorreta'})
        }
        res.status(200).json({message: 'Usuário logado com sucesso'})
    },


}