const { uploadFile } = require('../services/imagekit.service');
const { v4: uuid } = require('uuid');
const Foodmodel = require('../models/Food.model');

async function createFood(req, res) {
  try {
    const fileUploadResult = await uploadFile(req.file.buffer, uuid());
    const { name, description } = req.body;
    console.log(name , description)


    const CreateFood = await Foodmodel.create({
      name: name,
      video: fileUploadResult.url,
      description: description,
      FoodPartner: req.foodPartner._id,
    })

    return res.json({
      message: "Food created successfully",
      food: CreateFood,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong ' + error.message });
  }
}

async function getFooditems(req , res) {
  
}

module.exports = { createFood,getFooditems };