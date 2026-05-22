const UserSchema = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


async function userRegisterController(req, res) {
  console.log(req.body)
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
      console.log(`message: User already exists with this email`)
    }

    const HashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserSchema.create({
      username: username,
      email: email,
      password: HashedPassword,
    })
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

    return res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email
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

    return res.status(200).json({
      message: "Logout successful"
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}


module.exports = { userRegisterController, userLoginController, userLogoutController }

