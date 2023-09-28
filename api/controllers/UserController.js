import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export default {
    async getUserData(req, res) {
        try {
            const user = await UserModel.findByPk(req.user_id)
            if (!user) res.status(404).json({message: "Usuário não encontrado :("})
            return res.status(200).json({user})
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Erro ao buscar dados do usuário"});
        }
    },

    async createUser(req, res) {
        try {
            const {name, email, password} = req.body;
            if(!name || !email || !password) return res.status(400).json({message: "Preencha todos os campos!"})
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = {name, email, password: hashedPassword};
            await UserModel.create(user);
            return res.status(201).json({message:"Usuário salvo com sucesso!"});
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    async updateUser(req, res) {
        try {
            const user_id = req.user_id
            const {name, email, profile_image} = req.body
            if(!name || !email || !profile_image) return res.status(400).json({message: "Preencha todos os campos"})
            const userData = {name, email, profile_image}
            await UserModel.update(userData, {where: {user_id: user_id}})
            return res.status(200).json({message: "Usuário atualizado com sucesso!"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Erro ao editar usuário"})
        }
    },

    async deleteUser(req, res) {
        try {
            const userId = req.user_id
            const user = await UserModel.findByPk(userId)
            if (!user) res.status(404).json({message: "Usuário não encontrado :("})
            await user.destroy()
            res.status(200).json({message: "Usuário deletado com sucesso!"});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Erro ao deletar usuário"});
        }
    },
}