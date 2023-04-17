import {DataTypes, Model} from "sequelize";
import sequelize from "../config/db/db.js";
import Currency from "./Currency.js";

class StakedAsset extends Model {}

StakedAsset.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
}, {sequelize, modelName: "StakedAsset"});

StakedAsset.associate = (models) => {
    StakedAsset.belongsTo(models.User, {
        foreignKey: {
            name: "id",
            allowNull: true,
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
};

// StakedAsset.sync({alter: true})
//     .then(r => console.log('StakedAsset table is created'))
//     .catch(e => console.log('StakedAsset table is not created'));


export default StakedAsset;