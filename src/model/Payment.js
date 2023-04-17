import {DataTypes, Model} from "sequelize";
import sequelize from "../config/db/db.js";
import User from "./User.js";

class Payment extends Model{}
Payment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    paymentReference: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paymentDescription: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paymentType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
},{
    sequelize,
    modelName: 'Payment',
})

export default Payment;