const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Configure storage for multer to upload to cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'OcuMedAI', // Optional: change the folder name
    allowed_formats: ['jpeg', 'png', 'jpg']
  }
});

module.exports = {
  cloudinary,
  storage
};
