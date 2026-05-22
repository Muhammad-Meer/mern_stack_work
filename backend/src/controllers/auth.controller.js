const UserSchema = require('../models/user.model');
const bcrypt = require('bcrypt');



async function userRegisterController(req, res) {
  console.log(req.body)
  try {
    const { username, email, password } = req.body;



    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required to register a user"
      })
    }

    console.log("An error occurred while registering the user")


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




module.exports = { userRegisterController }

