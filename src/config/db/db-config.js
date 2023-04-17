const config = {
    development: {
        username: env.PG_USERNAME,
        password: env.PG_PASSWORD,
        database: 'sample_db',
        host: env.PG_HOST,
        port: env.PG_PORT,
        dialect: 'postgres',
    },
    test: {
        username: env.PG_USERNAME,
        password: env.PG_PASSWORD,
        database: 'sample_db',
        host: env.PG_HOST,
        port: env.PG_PORT,
        dialect: 'postgres',
    },
    production: {
        username: env.PG_USERNAME,
        password: env.PG_PASSWORD,
        database: 'sample_db',
        host: env.PG_HOST,
        port: env.PG_PORT,
        dialect: 'postgres',
    },
};

export default config;