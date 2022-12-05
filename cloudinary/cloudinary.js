const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')

cloudinary.config({ 
    cloud_name: 'dv5vyqpjh', 
    api_key: '925761581282615', 
    api_secret: '6MWWI3DQao370yQdUex2rQDdI3w' 
  });

  const storage = new CloudinaryStorage({cloudinary,params:{folder:"images",allowedformats:['jpeg','jpg','png','avif','gif','webp']}})
  module.exports={
    cloudinary,
    storage
  }