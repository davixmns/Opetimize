const express = require("express");
const startConnection = require("./database/connect");
const cors = require("cors");
const purchaseRoutes = require("./routes/purchaseRoutes");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
app.use("/", purchaseRoutes);

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});

startConnection();
