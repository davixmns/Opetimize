import Sequelize from "sequelize";
import database from "../database/DB.js";
import UserModel from "./UserModel.js";


const PurchaseModel = database.define('purchase', {
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
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false
});

PurchaseModel.belongsTo(UserModel, {
    foreignKey: 'user_id'
});

export default PurchaseModel;