require('dotenv').config();
const {Sequelize} = require("sequelize")

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const host = process.env.HOST
const port = process.env.PORT

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: "mysql",
    host: host,
    port: port
})

sequelize
    .authenticate()
    .then(() => {
        console.log("Conectado ao banco");
        sequelize.sync();
    })
    .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    });


module.exports = sequelize