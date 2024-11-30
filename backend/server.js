const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const curdRoutes = require('./routes/curdRoutes');


const app = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(curdRoutes);

mongoose.connect("mongodb://localhost:27017/curd")
.then(()=>console.log("Mongo Connected"))
.catch((err)=>console.log("mongo connected ",err));

app.listen(5000,()=>{
     console.log("server is running");
     
})