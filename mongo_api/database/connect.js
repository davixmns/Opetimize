const mongoose = require("mongoose");

function startConnection() {
    require("dotenv").config();
    const DB_USER = process.env.DB_USER;
    const DB_PASSWORD = process.env.DB_PASSWORD;
    mongoose
        .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@zeuscluster.ibjagkj.mongodb.net/Racoes?retryWrites=true&w=majority`)
        .then(() => {
            console.log("Conectado ao MongoDB");
        })
        .catch((error) => console.log(error));
}

module.exports = startConnection;
