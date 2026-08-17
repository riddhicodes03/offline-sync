const {getPool}=require('../config/db');

exports.findByEmail = async(email)=>{
    const [rows] = await getPool().query(`SELECT * from USER WHERE email =?`,[email]);
    return rows[0];
}
exports.create = async({email,password,name})=>{
    const [result]= await getPool().query('INSERT INTO user(name,email,password) VALUES(?,?,?)',[name,email,password]);
    return result.insertId;
}