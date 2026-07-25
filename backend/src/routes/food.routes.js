const express = require('express');
const foodRouter = express.Router();
const { authMiddleware, userAuthMiddleware } = require('../middleware/auth.middleware');
const { createFood, getFooditems, likeFood, saveFood, getSavedFoods } = require('../controllers/Food.controller');
const upload = require('../middleware/upload.middleware');

foodRouter.post('/', authMiddleware, upload.single("video"), createFood);
foodRouter.get('/', getFooditems);
foodRouter.post('/like', userAuthMiddleware, likeFood);
foodRouter.post('/save', userAuthMiddleware, saveFood);
foodRouter.get('/save', userAuthMiddleware, getSavedFoods);

module.exports = foodRouter;
