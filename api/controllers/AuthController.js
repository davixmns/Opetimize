import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel.js";
import utils from "../utils/utils.js";

export default {
    async login(req, res) { 
        try {
            const {email, password} = req.body;
            if (!email || !password) return res.status(400).json({message: 'Email e senha são obrigatórios'});
            const user = await UserModel.findOne({where: {email: email}})
            if (!user) return res.status(400).json({message: 'Usuário não cadastrado no sistema'});
            const correctPassword = await bcrypt.compare(password, user.password);
            if (!correctPassword) return res.status(400).json({message: 'Senha incorreta'});
            const token = utils.signJWT(user.id);
            res.status(200).json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Erro ao realizar login'});
        }
    },
};
