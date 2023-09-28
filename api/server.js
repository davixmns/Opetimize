import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
const app = express();

// Configurar middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//usando rotas
app.use(routes);

// Iniciar servidor
const port = 3001;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
