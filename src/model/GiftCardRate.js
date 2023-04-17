import {DataTypes, Model} from "sequelize";
import sequelize from "../config/db/db.js";
import User from "./User.js";

class GiftCardRate extends Model {
}

GiftCardRate.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        merchantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        fromCurrency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        toCurrency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rate: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        screenshots: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {sequelize, modelName: "GiftCardRate"}
);

export default GiftCardRate;