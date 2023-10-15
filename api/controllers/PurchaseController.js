import Purchase from "../models/PurchaseModel.js";

export default {
    async getAllPurchases(req, res) {
        try {
            const userId = req.user_id;
            const purchases = await Purchase.findAll({where: {user_id: userId}});
            return res.status(200).json(purchases);
        } catch (error) {
            console.log("ERRO AO PEGAR COMPRAS DE RAÇÃO, ERRO: " + error);
            return res.status(500).json({error: error.message});
        }
    },

    async createPurchase(req, res) {
        try {
            const {name, price, weight, date, rating} = req.body;
            const purchase = {name, price, weight, date, rating, user_id: req.user_id}
            await Purchase.create(purchase);
            return res.status(201).json({message: "Compra de ração salva com sucesso!"});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error});
        }
    },

    async updatePurchase(req, res) {
        try {
            const id = req.params.purchase_id;
            const oldPurchase = await Purchase.findByPk(id);
            const {name, price, weight, date, rating, user_id} = req.body;
            const newPurchase = {name, price, weight, date, rating, user_id};
            await oldPurchase.update(newPurchase, {where: {purchase_id: id}});
            return res.status(200).json({message: "Compra de ração atualizada com sucesso!"});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error});
        }
    },

    async deletePurchase(req, res) {
        try {
            const id = req.params.purchase_id;
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
