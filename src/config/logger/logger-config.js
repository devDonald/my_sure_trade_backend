import pino from 'pino';
import dotenv from "dotenv";
import pretty from "pino-pretty";
dotenv.config()

const transport = pino.transport({
    target: 'pino-pretty',
    options: {
        colorize: true,
        translateTime: "yyyy-mm-dd HH:MM:ss.l",
        levelFirst: true,
    }
})

const loggerConfig = pino({
    level: process.env.LOG_LEVEL,
    mkdir: true,
    sync: true,
    destination: process.env.LOG_FILE,
}, transport)
pretty(transport.options);
const stream = pretty(transport.options);
const logger = pino(stream, loggerConfig, pino.destination(loggerConfig.destination));
export default logger;