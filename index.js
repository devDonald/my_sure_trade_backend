import app from './src/app.js';
import sequelize from './src/config/db/db.js';
import db from "./src/config/db/db.js";

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

const port = normalizePort(process.env.PORT || '3000');

app.listen(
    port,
    () => {
        console.log(`Server is running on port ${port}`)
        try {
            db.authenticate().then(r => console.log('Database is connected'))
            .catch(e => console.log('Database failed to connect'));
            sequelize.sync({alter: false, force: false})
                .then(r => console.log('Database is synced'))
                .catch(e => console.log('Database is not synced: ' + e));
        }catch (e) {
            console.log('Database is not connected');
        }
    }
);