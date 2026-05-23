const express = require('express');
const router = express.Router();


async function createFood(req , res) {

  console.log(req.foodPartner)
  console.log(req.body)
  console.log(req.file)
  res.end()
  
}

module.exports =  {createFood} ;
