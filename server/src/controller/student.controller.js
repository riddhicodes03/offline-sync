const express = require('express');
const { getPool } = require('../config/db');

async function getStudent(req,res){
const [rows]=await getPool().query('SELECT * FROM students');
res.status(201).json(rows);
}
async function createStudent(req,res){
const {name,room_no}=req.body;
  const [result] = await getPool().query(
    'INSERT INTO students(name,room_no) VALUES(?,?)',
    [name,room_no]
);
res.status(201).json({message:'Student added', id:result.insertId});
}

module.exports={
    getStudent,createStudent
}
