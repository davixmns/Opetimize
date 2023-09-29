import * as jose from 'jose'
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_KEY

export default {
    async verifyToken(req, res, next){
        try{
            const token = req.headers['authorization']?.split(' ')[1]
            if(!token) return res.status(401).json({message: 'Token não informado'})
            const decoded = await jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
            if(!decoded) return res.status(401).json({message: 'Token inválido'})

            req.user_id = decoded.payload.user_id
            next()
        } catch (e) {
            console.log("ERRO AO VERIFICAR TOKEN ", e)
            return res.status(500).json({message: 'Erro ao verificar token'})
        }
    }
}