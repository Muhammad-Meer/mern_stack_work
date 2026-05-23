const express = require('express');
const router = express.Router();
// require('dotenv').config();


// ✅ Fixed: destructure uploadFile directly, matching the export
const { uploadFile } = require('../services/imagekit.service');
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  try {
    console.log(req.foodPartner);
    console.log(req.body);
    console.log(req.file);

    // ✅ Fixed: call uploadFile directly, not serviceStorage.uploadFile
    const fileUploadResult = await uploadFile(
      req.file.buffer,
      uuid()
    );

    console.log(fileUploadResult);

    return res.json({
      success: true,
      image: fileUploadResult,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = { createFood };