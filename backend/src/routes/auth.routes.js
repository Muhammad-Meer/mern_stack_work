const express = require('express');
const authRouter = express.Router();
const { userRegisterController } = require('../controllers/auth.controller')










authRouter.post('/register', userRegisterController)




module.exports = authRouter