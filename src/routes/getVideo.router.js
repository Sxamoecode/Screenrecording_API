const express = require('express');
const {
    startVid,
    uploadVid,
    stopVideo
} = require('../controllers/getVideo.controller');
const multer = require('multer');
/*
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
});*/
const storage = multer.memoryStorage(); 
const upload = multer({ storage });
//const upload = multer({ dest: 'uploads/' });

const videoRouter = express.Router();

videoRouter.post('/start', startVid);
videoRouter.put('/upload', upload.single('file'), uploadVid);
videoRouter.post('/stop', stopVideo);


module.exports = {
    videoRouter
}