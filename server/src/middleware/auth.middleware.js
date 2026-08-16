const jwt = require('jsonwebtoken');
const {GetUser}= require('../service/auth.service');
const secret = process.env.SECRET;

function authenticateUser(req,res,next){
    const token = req.cookies.uid;

    if(!token){
        return res.redirect('/login');
    }
    try{
        const decoded = GetUser(token,secret);
        req.user=decoded;
        console.log('Authenticated User : ',req.user);
        next();
    }catch(err){
        console.error('JWT verification failed: ',err);
        res.redirect('/login');
    }  
}

