const Purchase  = require("../models/PurchaseModel");

module.exports = {
    async getAllPurchasesByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const purchases = await Purchase.findAll({ where: { user_id: userId } });
            res.status(200).json(purchases);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    },

    async getPurchaseById(req, res) {
        try {
            const purchase = await Purchase.findByPk(req.params.id);
            if (!purchase) {
                res.status(404).json({ message: "Compra de ração não encontrada." });
            }
            res.status(200).json(purchase);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    },

    async updatePurchaseById(req, res) {
        try {
            const id = req.params.id;
            const oldPurchase = await Purchase.findByPk(id);
            if (!oldPurchase) {
                res.status(404).json({ message: "Compra de ração não encontrada." });
            }
            const { name, price, weight, date, user_id} = req.body;
            const newPurchase = { name, price, weight, date, user_id};
            await oldPurchase.update(newPurchase, {where: {purchase_id: id}});
            res.status(200).json({ message: "Compra de ração atualizada com sucesso!" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    },

    async deletePurchaseById(req, res) {
        try {
            const id = req.params.id;
            console.log(id)
            const purchase = await Purchase.findByPk(id);
            console.log(purchase)
            if (!purchase) {
                return res.status(404).json({ message: "Compra de ração não encontrada." });
            }
            await purchase.destroy();
            return res.status(200).json({ message: "Compra de ração deletada com sucesso!" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },

    async createPurchase(req, res) {
        try {
            const { name, price, weight, date, user_id } = req.body;
            const newPurchase = { name, price, weight, date, user_id };
            await Purchase.create(newPurchase);
            res.status(201).json({ message: "Compra de ração salva com sucesso!" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    },

    async deleteAllPurchases(req, res) {
        try {
            await Purchase.destroy({
                truncate: true // Remove todas as linhas da tabela
            });
            res.status(200).json({ message: "Todas as compras foram deletadas com sucesso." });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    },
};
