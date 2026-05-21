const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

  } catch (error) {
    return console.log(`connectDb error: ${error.message}`);
  }
}

module.exports = connectDB;