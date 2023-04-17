import {Model, DataTypes, Sequelize} from 'sequelize';
import sequelize from "../config/db/db.js";
import User from "./User.js";
import Currency from "./Currency.js";
class GiftCard extends Model{}
GiftCard.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        cardCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        cardPin:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        cardType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        currencyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Currency,
                key: 'id'
            }
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        discount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        expiryDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        screenshots: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            default: new Date(),
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {sequelize, modelName: "GiftCard"}
);


export default GiftCard;