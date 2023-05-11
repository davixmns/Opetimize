const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Configurar middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//usando rotas
app.use("/", require("./routes/routes"));

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
