const UserSchema = require('../models/user.model');



async function userRegisterController(req , res) {
   try {
    const {username , email, password} = req.body;

    if(!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required to register a user"
      })
    }
   } catch (error) {
     return res.status(500).json({
       message: "An error occurred while registering the user"
     }) 
   }


   const UserisExist = await UserSchema.findOne({email: email});

  if(UserisExist) {
    return res.status(400).json({
      message: "User already exists with this email"
    })
  }


}




module.exports = {userRegisterController}
