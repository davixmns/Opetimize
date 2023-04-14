///CONFIGURAÇÃO INICIAL
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Purchase = require('./models/Purchase')

//MIDDLEWARES
app.use(express.urlencoded({
    extended: true,
}),)
app.use(express.json())

//CONEXÃO COM O MONGO
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

//POST - CADASTRA UMA COMPRA DE RAÇÃO
app.post('/purchase', async (req, res) => {
    const {name, price, weight, date} = req.body
    if (!name) {
        res.status(422).json({error: "Compra não cadastrada, o nome é obrigatório"})
    } else if (!price) {
        res.status(422).json({error: "Compra não cadastrada, o preço é obrigatório"})
    } else if (!weight) {
        res.status(422).json({error: "Compra não cadastrada, o peso é obrigatório"})
    }
    const purchase = {
        name,
        price,
        weight,
        date
    }
    try {
        await Purchase.create(purchase)
        res.status(201).json({message: "Compra de ração foi cadastrada"})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//GET - CAPTURA TODAS AS COMPRAS DE RAÇÕES
app.get("/purchases", async (req, res) => {
    const allPurchases = await Purchase.find()
    res.status(200).json({ resposta: allPurchases })
})

//GET - CAPTURA UMA COMPRA DE RAÇÃO POR ID
app.get("/purchases/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const purchase = await Purchase.findById(id);
        if (!purchase) {
            res.status(404).json({ message: "Compra não encontrada." });
        }
        res.status(200).json({ resposta: purchase });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

//PUT - EDITAR COMPRA DE RAÇÃO POR ID

