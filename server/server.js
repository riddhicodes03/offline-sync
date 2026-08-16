require('dotenv').config();
const express = require('express');
const { initDB } = require('./src/config/db');
const router = require('./src/routes/student.route');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',router);
app.get('/',(req,res)=>{
    res.send('Welcome');
})
initDB().then(()=>{
    app.listen(3000,() =>console.log("Server running on port 3000"));
});