const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes');
const createFoodrouter = require('./routes/food.partner.routes');


const app = express();

app.use(express.json());
app.use(cookieParser());






app.use('/api/auth', authRouter);
app.use('/api/Food',createFoodrouter );




module.exports = app;

const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes');
const createFoodrouter = require('./routes/food.partner.routes');


const app = express();

app.use(express.json());
app.use(cookieParser());






app.use('/api/auth', authRouter);
app.use('/api/Food',createFoodrouter );




module.exports = app;

