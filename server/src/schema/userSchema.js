const {getPool}=require('../config/db');
async function createUsersTable(){
await getPool().query(  `
    CREATE TABLE IF NOT EXISTS user(
        id INT AUTO INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(255)NOT NULL,
    )
  `);
}

module.exports = createUsersTable;