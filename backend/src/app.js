const express = require('express');
const authRouter = require('./routes/auth.routes');
const cors = require('cors');
require('dotenv').config();


const app = express();

app.use(express.json());



app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use('/api/auth', authRouter);
module.exports = app;

