const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const uploadImageToPostImage = async (filePath) => {
  const form = new FormData();
  form.append('smfile', fs.createReadStream(filePath));

  const response = await axios.post('https://api.postimage.org/1/upload', form, {
    headers: {
      ...form.getHeaders(),
      'Content-Type': 'multipart/form-data',
    },
  });

  if (response.data && response.data.image) {
    return response.data.image.url;
  } else {
    throw new Error('Image upload failed');
  }
};

module.exports = uploadImageToPostImage;
