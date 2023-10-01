const express = require('express');
const {
    startVid,
    uploadVid,
    stopVideo
} = require('../controllers/getVideo.controller');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const videoRouter = express.Router();

videoRouter.post('/start', startVid);
videoRouter.put('/upload', upload.single('video'), uploadVid);
videoRouter.put('/stop', stopVideo);


module.exports = videoRouter;