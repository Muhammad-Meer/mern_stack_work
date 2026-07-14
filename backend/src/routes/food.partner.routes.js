const express = require('express');
const foodPartnerRouter = express.Router();
const { getFoodPartnerProfile } = require('../controllers/food.partner.controller');

foodPartnerRouter.get('/:id', getFoodPartnerProfile);

module.exports = foodPartnerRouter;
