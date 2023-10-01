const fs = require('fs');
const gfs = require('../services/mongo.db')



// route: startRecord
exports.startVid = (req, res) => {
  try {
    req.app.locals.chunks = [];
    return res.status(206).send('Recorder started');

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      Msg: 'Server error: ' + error.message
    })
  }
}
// route = router.post('/upload/:id', upload.single('file'), uploadVid);
exports.uploadVid = (req, res) => {
  try {
    req.app.locals.chunks.push(req.file.path);
    return res.json({
      status: 'Video upload successful'
    })
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      Msg: 'Server error: ' + error.message
    })
  }
};

exports.stopVideo = (req, res) => {
  try {
    const chunks = req.app.locals.chunks;

    // Create a write stream to store the collated video file
    const writeStream = gfs.createWriteStream({
      filename: 'collated-video.mp4',
      metadata: { originalName: 'collated-video.mp4' },
      mode: 'w',
    });
  
    // Read each chunk file and append it to the write stream
    chunks.forEach((chunkPath) => {
      const readStream = fs.createReadStream(chunkPath);
      readStream.pipe(writeStream);
    });
    
    // When all chunks are written, send the collated video file to the frontend
    writeStream.on('close', () => {
      res.set('Content-Type', 'video/mp4');
      res.set('Content-Disposition', 'attachment; filename="collated-video.mp4"');
      
      const readStream = gfs.createReadStream({
        filename: 'collated-video.mp4',
        mode: 'r',
      });
      
      readStream.pipe(res);
    });
      res.json({ status: 'Video processing completed' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      Msg: 'Server error: ' + error.message
    });
  };

}
