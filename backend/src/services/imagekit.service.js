const ImageKit = require('@imagekit/nodejs');

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(fileBuffer, fileName) {
  const { toFile } = require('@imagekit/nodejs');

  const response = await client.files.upload({
    file: await toFile(fileBuffer, fileName),
    fileName: fileName,
  });

  return response;
}

module.exports = { uploadFile };

