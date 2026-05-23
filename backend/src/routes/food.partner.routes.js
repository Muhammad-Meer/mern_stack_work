const express = require('express')
const createFoodrouter = express.Router()
const { authMiddleware , userAuthMiddleware  } = require('../middleware/auth.middleware')
const { createFood , getFooditems } = require('../controllers/Food.controller')
const upload = require('../middleware/upload.middleware')


// PROTECTED CREATE FOOD API
createFoodrouter.post('/', authMiddleware, upload.single("video"), createFood)
createFoodrouter.get('/', userAuthMiddleware, getFooditems)

module.exports = createFoodrouter