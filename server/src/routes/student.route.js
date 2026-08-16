const express = require('express');
const { getStudent, createStudent } = require('../controller/student.controller');
const router = express.Router();

router.get('/',getStudent);
router.post('/',createStudent);


module.exports=router;