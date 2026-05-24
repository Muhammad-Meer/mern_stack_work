const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes');
const createFoodrouter = require('./routes/food.partner.routes');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cookieParser());



app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use('/api/auth', authRouter);
app.use('/api/Food',createFoodrouter );




module.exports = app;
