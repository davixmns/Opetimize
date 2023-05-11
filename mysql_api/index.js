const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.use('/', require('./routes/index'));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
