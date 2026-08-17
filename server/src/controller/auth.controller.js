const {getPool}=require('../config/db');
const express = require('express');
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SetUser } = require('../service/auth.service');

async function register(req,res){
try{
const {name,email,password}=req.body;
if(!name||!email||!password){
    return res.status(400).json({error:'Name,email,and password are all required'});
}
if(password.length<6){
    return res.status(400).json({error:'password length must be above 6'});
}
const existingUser = User.findByEmail(email);
if(existingUser){
    return res.status(409).json({error:'An account with this email already exist'});
}
const hashedPassword = await bcrypt.hash(password,10);
const userId = await User.create({name,email,hashedPassword});

res.status(201).json({message:'User registered successfully',id:userId});
}catch(err){
console.error(err);
res.status(500).json({error:'Something went wrong during registration'});
}
};

async function login(req,res){
  try{
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({error:'Email and password are required '});
    }
    const user = await User.findByEmail(email);
    if(!user){
        return res.status(401).json({error:'Invalid email and password'});
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if(!passwordMatches){
        return res.status(401).json({error:'Invalid email and password'});
    }
    const token = SetUser(user);
   res.json({
    message:'Login successful',
    token,
    user: {id:user.id, name:user.name, email:user.email},
   });
  }catch(err){
   console.error(err);
   res.status(500).json({error:'Something went wrong during login'});
  }
}

module.exports={
    register,login
}