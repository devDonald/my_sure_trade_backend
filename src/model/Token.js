import {DataTypes, Model} from "sequelize";
import sequelize from "../config/db/db.js";

class Token extends Model {}
    Token.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                default: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        }, {sequelize, modelName: "Token"}
    );
    Token.associate = function (models) {
        Token.belongsTo(models.User, {
            foreignKey: {
                name: "id",
                allowNull: true,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    };

// Token.sync({alter: true})
//     .then(r => console.log('Token table is created'))
//     .catch(e => console.log('Token table is not created'));



export default Token;