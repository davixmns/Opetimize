///config inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Purchase = require('./models/Purchase')

//forma de ler json / middlewares
app.use(express.urlencoded({
    extended: true,
}),)
app.use(express.json())

//rotas da api
app.post('/purchase', async (req, res) => {
    const {name, price, weight, date} = req.body
    const purchase = {
        name,
        price,
        weight,
        date
    }
    try{
        await Purchase.create(purchase) //criando dados
        res.status(201).json({message: "Compra de ração foi cadastrada"})
    }catch (error){
        res.status(500).json({error: error})
    }
})


//rota inicial / endpoint
app.get('/', (req, res) => {
    //mostrar req
    //teste
    res.json({message: "oi express!"})
})

//entregar uma porta
require('dotenv').config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const PORT = 3000

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@zeuscluster.ibjagkj.mongodb.net/test?retryWrites=true&w=majority`)
    .then(() => {
        console.log("conectamos ao mongodb")
        app.listen(PORT, () => {
            console.log(`Servidor iniciado na porta ${PORT}`)
        })
    })
    .catch((err) => console.log(err))
