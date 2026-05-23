const ImageKit = require('@imagekit/nodejs');


const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file, fileName) {
  const result = await imagekit.upload({
    file: file,
    fileName: fileName,
  });

  // ✅ Fixed: result.file → result.fileId
  console.log(result.fileId, result.fileName, result.url);

  return result;
}

// ✅ Fixed: export as an object so it matches the import style
module.exports = { uploadFile };