const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

async function initDB() {
  // connect WITHOUT specifying a database yet — safe whether it exists or not
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
  await connection.end();

  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
  });

  console.log('Database ready');
  return pool;
}

function getPool() {
  if (!pool) throw new Error('DB not initialized yet');
  return pool;
}

module.exports = { initDB, getPool };