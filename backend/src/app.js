const express = require('express');
const authRouter = require('./routes/auth.routes');
const cors = require('cors');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRouter);
module.exports = app;

