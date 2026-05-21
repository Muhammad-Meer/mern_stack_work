// const express = require('express');
// const cors = require('cors');


// const app = express();

// app.use(cors());

// const users = [
//   "Ali",
//   "Ahmed",
//   "Usman",
//   "Hassan",
//   "Hussain",
//   "Zain",
//   "Bilal",
//   "Hamza",
//   "Saad",
//   "Taha",
//   "Ayan",
//   "Farhan",
//   "Talha",
//   "Danish",
//   "Shayan",
//   "Abdullah",
//   "Rehan",
//   "Imran",
//   "Shahzaib",
//   "Kashan"
// ];

// app.get('/users', (req, res) => {
//     return res.json({
//       message: "successfully fetched users",
//       data: users
//     })
// })
// module.exports = app;

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


// data store (temporary)
let users = [];

// POST API (frontend se data lena)
app.post("/user", (req, res) => {
  const { name, fatherName } = req.body;

  const newUser = {
    name,
    fatherName
  };

  users.push(newUser);

  res.json({
    success: true,
    message: "User saved",
    data: newUser
  });
});

module.exports = app;
