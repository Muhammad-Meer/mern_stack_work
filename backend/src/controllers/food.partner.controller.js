const FoodPartner = require('../models/food.partner.model');
const Foodmodel = require('../models/Food.model');

async function getFoodPartnerProfile(req, res) {
  try {
    const { id } = req.params;
    const partner = await FoodPartner.findById(id);
    if (!partner) {
      return res.status(404).json({ message: 'Food partner not found' });
    }
    const foods = await Foodmodel.find({ FoodPartner: id });
    return res.json({
      partner: {
        _id: partner._id,
        businessName: partner.businessName,
        username: partner.username,
        email: partner.email,
      },
      foods,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong ' + error.message });
  }
}

module.exports = { getFoodPartnerProfile };
