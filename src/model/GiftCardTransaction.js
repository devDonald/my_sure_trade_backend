import {DataTypes, Model} from "sequelize";
import Currency from "./Currency.js";
import GiftCardRate from "./GiftCardRate.js";
import GiftCard from "./GiftCard.js";
import sequelize from "../config/db/db.js";
import User from "./User.js";

class GiftCardTransaction extends Model {}
GiftCardTransaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        giftCardId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: GiftCard,
                key: 'id'
            }
        },
        giftCardRateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: GiftCardRate,
                key: 'id'
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        merchantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        transactionType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fee: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        currencyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Currency,
                key: 'id'
            }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
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
    }, {sequelize, modelName: "GiftCardTransaction"}
    );

    export default GiftCardTransaction;