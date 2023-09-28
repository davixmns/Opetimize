import jwt from "jsonwebtoken";
import Purchase from "../models/PurchaseModel.js";

export default {
    async getAllPurchasesByUserId(req, res) {
        try {
            const token = req.params.token;
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            const userId = decoded.userId;
            const purchases = await Purchase.findAll({where: {user_id: userId}});
            res.status(200).json(purchases);
        } catch (error) {
            console.log(error);
            res.status(500).json({error: error.message});
        }
    },

    async createPurchase(req, res) {
        try {
            const token = req.params.token;
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            const userId = decoded.userId;
            const {name, price, weight, date} = req.body;
            const newPurchase = {name, price, weight, date, user_id: userId};
            await Purchase.create(newPurchase);
            res.status(201).json({message: "Compra de ração salva com sucesso!"});
        } catch (error) {
            console.log(error);
            res.status(500).json({error});
        }
    },

    async getPurchaseById(req, res) {
        try {
            const token = req.params.token;
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            const userId = decoded.userId;
            const purchase = await Purchase.findByPk(userId);
            if (!purchase) {
                res.status(404).json({message: "Compra de ração não encontrada."});
            }
            res.status(200).json(purchase);
        } catch (error) {
            console.log(error);
            res.status(500).json({error});
        }
    },

    async updatePurchaseById(req, res) {
        try {
            const id = req.params.id;
            const oldPurchase = await Purchase.findByPk(id);
            const {name, price, weight, date, user_id} = req.body;
            const newPurchase = {name, price, weight, date, user_id};
            await oldPurchase.update(newPurchase, {where: {purchase_id: id}});
            res.status(200).json({message: "Compra de ração atualizada com sucesso!"});
        } catch (error) {
            console.log(error);
            res.status(500).json({error});
        }
    },

    async deletePurchaseById(req, res) {
        try {
            const id = req.params.id;
            const purchase = await Purchase.findByPk(id);
            if (!purchase) {
                return res.status(404).json({message: "Compra de ração não encontrada."});
            }
            await purchase.destroy();
            return res.status(200).json({message: "Compra de ração deletada com sucesso!"});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error});
        }
    },
};
