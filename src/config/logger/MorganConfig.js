import morgan from 'morgan';
import {config} from 'dotenv';
import logger from "./logger-config.js";


const {env} = config();

const morganConfig = {
    skip: (req, res) => res.statusCode < 400,
    stream: process.stderr,
};

const morganSuccessHandler = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    morganConfig
);

const morganErrorHandler = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
        ...morganConfig,
        skip: (req, res) => res.statusCode >= 400,
        stream: process.stdout,
    });

if (env !== 'test') {
    logger.info('Morgan logging enabled.');
}

export {morganSuccessHandler, morganErrorHandler};