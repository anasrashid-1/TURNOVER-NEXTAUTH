import mysql from 'mysql2/promise';

export const connect = async () => {
    try {
        const connection = await mysql.createConnection(`${process.env.SQL_URL}`);
        console.log('Connection to the database has been established successfully.');
        return connection;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};

