require('dotenv').config();
const express = require('express');
const { initDB } = require('./src/config/db');
const router = require('./src/routes/student.route');
const createAllTables = require('./src/schema');
const app = express();
const authRouter = require('./src/routes/auth.route')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',router);
app.use('/api/auth',authRouter);
app.get('/',(req,res)=>{
    res.send('Welcome');
})
const PORT = process.env.PORT || 3000;
initDB().then(()=>createAllTables()).then(()=>{
    app.listen( PORT,() =>console.log("Server running on port ${PORT}"));
});