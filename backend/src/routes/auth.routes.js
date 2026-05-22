const express = require('express');
const authRouter = express.Router();
const { userRegisterController, userLoginController, userLogoutController } = require('../controllers/auth.controller')

//        AUTH ROUTES
authRouter.post('/register', userRegisterController)
authRouter.post('/login', userLoginController)
authRouter.post('/logout', userLogoutController)








module.exports = authRouter