const express = require('express')
const createFoodrouter = express.Router()
const { authMiddleware } = require('../middleware/auth.middleware')
const { createFood } = require('../controllers/Food.controller')
const upload = require('../middleware/upload.middleware')


// PROTECTED CREATE FOOD API
createFoodrouter.post('/', authMiddleware, upload.single("video"), createFood)

module.exports = createFoodrouter