const createStudentsTable = require(
    `../schema/studentSchema`
);
const createUsersTable = require(`../schema/userSchema`);

async function createAllTables(){
    await createStudentsTable();
    await createUsersTable();
    console.log('all tables ready');
}
module.exports = createAllTables;