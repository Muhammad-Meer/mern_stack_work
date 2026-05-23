const FoodPartnerModel = require('../models/food.partner.model');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        // 1. Extract token from cookies
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Please login first. No token provided." });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // 3. Find the partner in the database
        const foodPartner = await FoodPartnerModel.findById(decoded.id);

        if (!foodPartner) {
            return res.status(401).json({ success: false, message: "Partner not found, please login again" });
        }

        // 4. Attach partner data to the request object for use in subsequent routes
        req.foodPartner = foodPartner; 
        
        // 5. Proceed to the next middleware/route handler
        next(); 
        
    } catch (error) {
        // 6. Handle expired or invalid tokens safely
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Session expired, please login again" });
        }
        return res.status(401).json({ success: false, message: "Invalid token, please login again" });
    }
};

module.exports = {authMiddleware};
