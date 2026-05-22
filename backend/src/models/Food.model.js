const mongoose = require('mongoose');


const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  video: {
    type: String,
    required: true,
    
  },


  description: {
    type: String,
    required: true,
  },

  FoodPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodPartner"
  },
})

module.exports = mongoose.model(" createFood", FoodSchema);