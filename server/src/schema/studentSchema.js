const {getPool} = require('../config/db');
async function createStudentsTable() {
    await getPool().query(`
        CREATE TABLE IF NOT EXISTS students(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        room_no VARCHAR(20)
        )
        `);
}
module.exports  = createStudentsTable;