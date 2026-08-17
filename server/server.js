require('dotenv').config();
const express = require('express');
const { initDB } = require('./src/config/db');
const router = require('./src/routes/student.route');
const createAllTables = require('./src/schema');
const app = express();
const authRoutes = require('./src/routes/auth.route')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',router);
app.use('/api/auth',authRoutes);
app.get('/',(req,res)=>{
    res.send('Welcome');
})
initDB().then(()=>createAllTables()).then(()=>{
    app.listen(3000,() =>console.log("Server running on port 3000"));
});