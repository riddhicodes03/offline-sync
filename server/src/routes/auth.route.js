const express = require('express');
const { login, register }= require('../controller/auth.controller');
const {authenticateUser}=require('../middleware/auth.middleware')
const router = express.Router();

router.post('/login',authenticateUser, login);
router.post('/register',register);

module.exports={
    login,register
} 