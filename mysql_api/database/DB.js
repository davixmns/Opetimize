import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config()

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const port = process.env.DB_PORT

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    dialect: 'mysql',
    host: host,
    port: port,
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


export default sequelize;