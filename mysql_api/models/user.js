const Sequelize = require("sequelize")
const database = require("../database/db")
const Purchase = require("./purchase")
const Pet = require("./pet")

const User = database.define('user', {
    user_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
})



module.exports = User
