const { uploadFile } = require('../services/imagekit.service');
const { v4: uuid } = require('uuid');
const Foodmodel = require('../models/Food.model');
const Like = require('../models/likes.model');
const Save = require('../models/save.model');

async function createFood(req, res) {
  try {
    const fileUploadResult = await uploadFile(req.file.buffer, uuid());
    const { name, description } = req.body;

    const CreateFood = await Foodmodel.create({
      name: name,
      video: fileUploadResult.url,
      description: description,
      FoodPartner: req.foodPartner._id,
    })

    return res.json({
      message: "Food created successfully",
      food: CreateFood,
      videoUrl: fileUploadResult.url,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong ' + error.message });
  }
}

async function getFooditems(req, res) {
 try{
    const fooditems = await Foodmodel.find({}).populate('FoodPartner', 'businessName username email');
    return res.json({
      message: "Food items retrieved successfully",
      fooditems: fooditems,
    })
 } catch(error) {
    res.status(500).json({ error: 'Something went wrong ' + error.message })
 }
}

async function likeFood(req, res) {
  try {
    const { foodId } = req.body;
    const userId = req.user._id;

    const existingLike = await Like.findOne({ user: userId, food: foodId });

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      await Foodmodel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });
      return res.json({ like: false, message: 'Like removed' });
    } else {
      await Like.create({ user: userId, food: foodId });
      await Foodmodel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });
      return res.json({ like: true, message: 'Like added' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong ' + error.message });
  }
}

async function saveFood(req, res) {
  try {
    const { foodId } = req.body;
    const userId = req.user._id;

    const existingSave = await Save.findOne({ user: userId, food: foodId });

    if (existingSave) {
      await Save.deleteOne({ _id: existingSave._id });
      await Foodmodel.findByIdAndUpdate(foodId, { $inc: { savesCount: -1 } });
      return res.json({ save: false, message: 'Save removed' });
    } else {
      await Save.create({ user: userId, food: foodId });
      await Foodmodel.findByIdAndUpdate(foodId, { $inc: { savesCount: 1 } });
      return res.json({ save: true, message: 'Save added' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong ' + error.message });
  }
}

async function getSavedFoods(req, res) {
  try {
    const userId = req.user._id;
    const saves = await Save.find({ user: userId }).populate({
      path: 'food',
      populate: { path: 'FoodPartner', select: 'businessName username email' }
    });
    const fooditems = saves.map(s => s.food).filter(Boolean);
    return res.json({ message: "Saved foods retrieved", fooditems });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong ' + error.message });
  }
}

module.exports = { createFood, getFooditems, likeFood, saveFood, getSavedFoods };
