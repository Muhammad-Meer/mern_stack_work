const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();

app.use(cors());

const users = [
  "Ali",
  "Ahmed",
  "Usman",
  "Hassan",
  "Hussain",
  "Zain",
  "Bilal",
  "Hamza",
  "Saad",
  "Taha",
  "Ayan",
  "Farhan",
  "Talha",
  "Danish",
  "Shayan",
  "Abdullah",
  "Rehan",
  "Imran",
  "Shahzaib",
  "Kashan"
];

app.get('/users', (req, res) => {
    return res.json({
      message: "successfully fetched users",
      data: users
    })
})
module.exports = app;

