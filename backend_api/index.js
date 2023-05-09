const express = require('express')
const mongoose = require('mongoose')
const purchaseController = require("controllers/purchaseController.js")
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//conexao
function startConnection() {
    require('dotenv').config();
    const DB_USER = process.env.DB_USER;
    const DB_PASSWORD = process.env.DB_PASSWORD;
    const PORT = 3000
    mongoose
        .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@zeuscluster.ibjagkj.mongodb.net/Racoes?retryWrites=true&w=majority`)
        .then(() => {
            console.log("conectamos ao mongodb")
            app.listen(PORT, () => {
                console.log(`Servidor iniciado na porta ${PORT}`)
            })
        })
        .catch((err) => console.log(err))
}
startConnection()

//rotas
const router = express.Router()
router.get("/purchases", purchaseController.getAllPurchases)
router.get("/purchases/:id", purchaseController.getPurchaseById)
router.post("/purchases", purchaseController.createPurchase)
router.put("/purchases/:id", purchaseController.updatePurchaseById)
router.delete("/purchases/:id", purchaseController.deletePurchaseById)

app.use('/', router);

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});