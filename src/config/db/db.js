import {Sequelize} from "sequelize";
import dotenv from 'dotenv'
import logger from "../logger/logger-config.js";
dotenv.config()


const {
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DIALECT,
    DB_HOST,
    DB_POOL_MAX,
    DB_POOL_MIN,
    DB_POOL_ACQUIRE,
    DB_POOL_IDLE,
} = process.env;
const sequelize = new Sequelize(
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    {
        host: DB_HOST,
        dialect: DB_DIALECT,
        logging: (msg) => logger.info(msg),
        pool: {
            max: parseInt(DB_POOL_MAX),
            min: parseInt(DB_POOL_MIN),
            acquire: parseInt(DB_POOL_ACQUIRE),
            idle: parseInt(DB_POOL_IDLE)
        }
    }
)
export default sequelize;