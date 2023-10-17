import * as jose from "jose";
import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel.js";

const jwt_key = process.env.JWT_KEY;

export default {
    async login(req, res) { 
        try {
            const {email, password} = req.body;
            if (!email || !password) return res.status(400).json({message: 'Email e senha são obrigatórios'});
            const user = await UserModel.findOne({where: {email: email}})
            if (!user) return res.status(400).json({message: 'Usuário não cadastrado no sistema'});
            const correctPassword = await bcrypt.compare(password, user.password);
            if (!correctPassword) return res.status(400).json({message: 'Senha incorreta'});
            const token = await new jose.SignJWT({user_id: user.user_id})
                .setProtectedHeader({alg: "HS256"})
                .setIssuedAt()
                .setExpirationTime("1y")
                .sign(new TextEncoder().encode(jwt_key));
            res.status(200).json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Erro ao realizar login'});
        }
    },
};
