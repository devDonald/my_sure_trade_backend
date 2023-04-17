import {DataTypes, Model} from "sequelize";
import sequelize from "../config/db/db.js";
import User from "./User.js";
import Currency from "./Currency.js";

class Account extends Model {}

Account.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Currency,
                key: "id",
            }
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0.00,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: User,
                key: "id",
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }
    , {sequelize, modelName: "Account"}
);

// Account.sync({alter: true})
//     .then(r => console.log('Account table is created'))
//     .catch(e => console.log('Account table is not created'));

export default Account;