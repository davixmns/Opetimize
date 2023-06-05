const UserModel = require("../models/UserModel")
const PetModel = require("../models/PetModel");
const PurchaseModel = require("../models/PurchaseModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const jwtKey = process.env.JWT_KEY

module.exports = {
    async getUserByToken(req, res) {
        try {
            const token = req.params.token
            const decoded = jwt.verify(token, jwtKey)
            if(decoded){
                const user = await UserModel.findByPk(decoded.userId)
                if(user){
                    const userDTO = {
                        user_id: user.user_id,
                        name: user.name,
                        email: user.email,
                        profile_image: user.profile_image
                    }
                    res.status(200).json(userDTO)
                } else {
                    res.status(404).json({message: "Usuário não encontrado :("})
                }
            } else {
                res.status(404).json({message: "Usuário não encontrado :("})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    async getUserById(req, res) {
        try {
            const user = await UserModel.findByPk(req.params.id)
            if(user){
                const userDTO = {
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email,
                    profile_image: user.profile_image
                }
                res.status(200).json(userDTO)
            } else {
                res.status(404).json({message: "Usuário não encontrado :("})
            }
        } catch (error) {
            res.status(500).json({error})
        }
    },

    async getUserByEmail(req, res) {
        try {
            const user = await UserModel.findOne({where: {email: req.params.email}})
            if (!user) {
                res.status(404).json({message: "Usuário não encontrado :("})
            }
            const userDTO = {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                profile_image: user.profile_image
            }
            res.status(200).json(userDTO)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async createUser(req, res) {
        try {
            const {name, email, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = {name, email, password: hashedPassword};
            await UserModel.create(user);
            return res.status(201).json({message:"Usuário salvo com sucesso!"});
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    async updateUserById(req, res) {
        try {
            const id = req.params.id
            const oldUser = await UserModel.findByPk(id)
            if (!oldUser) {
                res.status(404).json({message: "Usuário não encontrado :("})
            }
            const {name, email, profile_image} = req.body
            const newUser = {name, email, profile_image}
            await UserModel.update(newUser, {where: {user_id: id}})
            res.status(200).json({message: "Usuário atualizado com sucesso!"})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async deleteUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await UserModel.findByPk(id);
            if (!user) {
                res.status(404).json({message: "Usuário não encontrado!"});
            }
            await PetModel.destroy({where: {user_id: id}});
            await PurchaseModel.destroy({where: {user_id: id}});
            await user.destroy()
            res.status(200).json({message: "Usuário deletado com sucesso!"});
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },


    async deleteAllUsers(req, res) {
        try {
            await PurchaseModel.destroy({where: {}});
            await PetModel.destroy({where: {}});
            await UserModel.destroy({where: {}});

            res.status(200).json({message: "Todos os usuários foram deletados com sucesso!"});
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}