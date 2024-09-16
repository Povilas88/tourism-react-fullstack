import mysql from 'mysql2/promise';

const dbOptions = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tourism',
};

export let connection = null;

try {
    connection = await mysql.createConnection(dbOptions);
    console.log('Working');

} catch (error) {
    console.log('Cant get Database, turn on XAMP');

}

setInterval(async () => {
    if (connection?.connection?._fatalError !== null) {
        try {
            connection = await mysql.createConnection(dbOptions);
        } catch {
            console.log('Cant get Database, turn on XAMP');
        }
    } else {
        console.log('Connection: ok');

    }
}, 10000)