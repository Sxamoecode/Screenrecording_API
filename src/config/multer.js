const multer = require('multer');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');


const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      bucketName: 'uploads', // Name of the GridFS bucket
      filename: file.originalname // Use the original file name as the GridFS filename
    };
  }
});

const upload = multer({ storage });

module.exports = {
  upload,
  storage
}
