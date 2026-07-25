const ImageKit = require('@imagekit/nodejs');

let client = null;

function getClient() {
  if (!client) {
    client = new ImageKit({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    });
  }
  return client;
}

async function uploadFile(fileBuffer, fileName) {
  const { toFile } = require('@imagekit/nodejs');

  const response = await getClient().files.upload({
    file: await toFile(fileBuffer, fileName),
    fileName: fileName,
  });

  return response;
}

module.exports = { uploadFile };
