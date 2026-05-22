const FoodPartnerModel = require('../models/food.partner.model');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please login first"
    });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);


      const FoodPartner = await FoodPartnerModel.findById(decoded.id);
      console.log(decoded.id + decoded)

      

    }catch (error) {
      return res.status(401).json({
        message: "Invalid token, please login again"
      });
    }
}

}







module.exports = authMiddleware;