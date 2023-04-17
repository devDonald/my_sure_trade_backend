import {DataTypes, Model} from "sequelize";
import User from "./User.js";
import sequelize from "../config/db/db.js";

class BankDetails extends Model {}

BankDetails.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bankName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    accountName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    bankCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bankCountry: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
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
    modelName: 'BankDetails',
    }
);

export default BankDetails;