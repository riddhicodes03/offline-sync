const {getPool}=require('../config/db');
async function createUsersTable(){
await getPool().query(  `
    CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
)
  `);
}

module.exports = createUsersTable;