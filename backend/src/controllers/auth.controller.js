const UserSchema = require('../models/user.model');
const FoodPartner = require('../models/food.partner.model');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000
};

async function userRegisterController(req, res) {
  try {
    const { username, email, password } = req.body;



    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required to register a user"
      })
    }

    console.log("Register request received")


    const UserisExist = await UserSchema.findOne({ email: email });

    if (UserisExist) {
      return res.status(400).json({
        message: "User already exists"
      })
    }

    const HashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserSchema.create({
      username: username,
      email: email,
      password: HashedPassword,
    })

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, cookieOptions);
    return res.status(201).json({
      message: "User registered successfully",
      username: username,
      email: email,
    })

  } catch (error) {
    return res.status(500).json({
      message: `An error occurred while registering the user: ${error.message}`
    })
  }
}

async function userLoginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }


    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

async function userLogoutController(req, res) {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

async function userProfileController(req, res) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserSchema.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}


async function FoodPartnerRegisterController(req, res) {
  try {
    const { username, email, password, businessName } = req.body;
    console.log(req.body)



    if (!username || !email || !password|| !businessName) {
      return res.status(400).json({
        message: "All fields are required to register a FoodPartner"
      })
    }

    console.log("Register request received")


    const FoodPartnerisExist = await FoodPartner.findOne({ email: email });

    if  (FoodPartnerisExist) {
      return res.status(400).json({
        message: "FoodPartner already exists"
      })
    }

    const HashedPassword = await bcrypt.hash(password, 10);

    const newFoodPartner = await FoodPartner.create({
      username: username,
      email: email,
      password: HashedPassword,
      businessName: businessName
    })

    const token = jwt.sign(
      { id: newFoodPartner._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, cookieOptions);
    return res.status(201).json({
      message: "newFoodPartner registered successfully",
      username: username,
      email: email,
      businessName: businessName
    })

  } catch (error) {
    return res.status(500).json({
      message: `An error occurred while registering the user: ${error.message}`
    })
  }
}

async function FoodPartnerLoginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const user = await FoodPartner.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "FoodPartner not found"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }


    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        businessName: user.businessName
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

async function FoodPartnerLogoutController(req, res) {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
module.exports = {
   userRegisterController,
   userLoginController,
    userLogoutController,
    userProfileController,
    FoodPartnerRegisterController,
     FoodPartnerLoginController,
      FoodPartnerLogoutController
   }


