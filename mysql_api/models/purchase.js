const Sequelize = require('sequelize')
const database = require('../database/db')

const Purchase = database.define("purchase", {
    purchase_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    weight: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    date: {
       type: Sequelize.DATE,
       allowNull: false
    }
})

module.exports = Purchase