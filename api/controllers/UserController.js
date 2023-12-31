import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import PurchaseModel from "../models/PurchaseModel.js";
import utils from "../utils/utils.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


export default {
    async getUserData(req, res) {
        try {
            const user = await UserModel.findOne({where: {user_id: req.user_id}, attributes: {exclude: ['password']}})
            if (!user) res.status(404).json({message: "Usuário não encontrado :("})
            return res.status(200).json(user)
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Erro ao buscar dados do usuário"});
        }
    },

    async createUser(req, res) {
        try {
            const {name, email, password} = req.body;
            if(!name || !email || !password) return res.status(400).json({message: "Preencha todos os campos!"})
            if(password.length < 6) return res.status(400).json({message: "A senha deve ter no mínimo 6 letras!"})
            if(!emailRegex.test(email)) return res.status(400).json({message: "Email inválido!"})
            const userExists = await UserModel.findOne({where: {email: email}});
            if (userExists) return res.status(400).json({message: "Email já cadastrado!"});
            const hashedPassword = await bcrypt.hash(password, 12);
            await UserModel.create({name, email, password: hashedPassword});
            const user = await UserModel.findOne({where: {email: email}});
            const jwt = await utils.signJWT(user.user_id);
            return res.status(201).json({jwt: jwt, message:"Usuário salvo com sucesso!"});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Erro ao criar conta"});
        }
    },

    async updateUser(req, res) {
        try {
            const user_id = req.user_id
            const {name, email, profile_image} = req.body
            if(!name || !email) return res.status(400).json({message: "Preencha todos os campos"})
            const userData = {name, email, profile_image}
            await UserModel.update(userData, {where: {user_id: user_id}})
            return res.status(200).json({message: "Usuário atualizado com sucesso!"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Erro ao editar conta"})
        }
    },

    async deleteUser(req, res) {
        try {
            const userId = req.user_id
            const user = await UserModel.findByPk(userId)
            if (!user) res.status(404).json({message: "Usuário não encontrado :("})
            await PurchaseModel.destroy({where: {user_id: userId}})
            await user.destroy()
            res.status(200).json({message: "Usuário deletado com sucesso!"});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Erro ao deletar usuário"});
        }
    },

    async updatePassword(req, res) {
        try {
            const user_id = req.user_id
            const {old_password, new_password} = req.body;
            const user = await UserModel.findByPk(user_id);
            if (!user) return res.status(400).json({message: 'Usuário não encontrado'});
            const passwordCorrect = await bcrypt.compare(old_password, user.password);
            if (!passwordCorrect) return res.status(400).json({message: 'Senha atual incorreta'});
            user.password = await bcrypt.hash(new_password, 12);
            await user.save();
            res.status(200).json({message: 'Senha atualizada com sucesso'});
        } catch (e) {
            console.log(e);
            res.status(400).json({error: 'Erro ao atualizar senha'});
        }
    },

    async createNewPassword(req, res){
        try{
            const user_id = req.user_id
            const {password} = req.body
            const user = await UserModel.findByPk(user_id)
            if(!user) return res.status(400).json({message: "Usuário não encontrado"})
            user.password = await bcrypt.hash(password, 12)
            await user.save()
            return res.status(200).json({message: "Senha atualizada com sucesso!"})
        }catch (e) {
            console.log(e);
            res.status(400).json({error: 'Erro ao atualizar senha'});
        }
    }
}