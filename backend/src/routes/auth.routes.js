const express = require('express');
const authRouter = express.Router();

const {
  userRegisterController,
  userLoginController,
  userLogoutController,
  userProfileController,
  FoodPartnerRegisterController,
  FoodPartnerLoginController,
  FoodPartnerLogoutController
} = require('../controllers/auth.controller');



// ================= USER AUTH ROUTES =================

authRouter.post('/user/register', userRegisterController);

authRouter.post('/user/login', userLoginController);

authRouter.get('/user/logout', userLogoutController);

authRouter.get('/profile', userProfileController);



// ============== FOOD PARTNER AUTH ROUTES ==============

authRouter.post('/food-partner/register', FoodPartnerRegisterController);

authRouter.post('/food-partner/login', FoodPartnerLoginController);

authRouter.get('/food-partner/logout', FoodPartnerLogoutController);



module.exports = authRouter;