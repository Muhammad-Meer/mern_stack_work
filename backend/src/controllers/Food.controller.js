require('dotenv').config(); // ← ye sabse upar hona chahiye 
const { uploadFile } = require('../services/imagekit.service');
const { v4: uuid } = require('uuid');

async function createFood(req, res) {
  console.log(req.file, req.file.buffer);
  try {
    const fileUploadResult = await uploadFile(req.file.buffer, uuid());

    return res.json({
      success: true,
      video: fileUploadResult,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong ' +error.message });
  }
}

module.exports = { createFood };