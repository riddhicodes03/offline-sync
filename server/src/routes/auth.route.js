const express = require('express');
const { login, register }= require('../controller/auth.controller');
const {authenticateUser}=require('../middleware/auth.middleware')
const AuthRouter = express.Router();

AuthRouter.post('/login',authenticateUser, login);
AuthRouter.post('/register',register);

module.exports= AuthRouter;