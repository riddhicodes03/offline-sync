const mysql = require('mysql2/promise');
require('dotenv').config();
let pool;
//ready the database and table
async function initDB(){
    const connection = await mysql.createConnection({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
    });
    //creating a database if does not exists
    await connection.query('CREATE DATABASE IF NOT EXISTS students_db');
    await connection.end();

 pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    waitForConnections:true,
    connectionLimit:10,
});
    console.log('Database ready');
    return pool;
}

function getPool(){
    if(!pool) throw new Error('DB not initialized yet');
    return pool;
}
module.exports = {initDB,getPool};