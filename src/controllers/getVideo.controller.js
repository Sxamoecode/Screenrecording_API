const {transcribe} = require('../services/transcribeVid')

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
exports.uploadVid = (req, res) => {
  try {
    const videoData = req.file.buffer;
    req.app.locals.chunks.push(videoData); //req.file.path
    return res.status(206).json({
      status: 'Video upload successful'
    })
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      Msg: 'Server error: ' + error.message
    })
  }
};

exports.stopVideo = async (req, res) => {
  try {
    const chunks = req.app.locals.chunks;
    //console.log(chunks);

    const wholeBlob = new Blob(chunks, {type: 'video/mp4'});

    const wholeBlobURL = URL.createObjectURL(wholeBlob);

    const transcript = transcribe(wholeBlobURL);
    if(!transcript) {
      console.error('Transcript error');
    }
  
    res.setHeader('Content-Type', 'video/mp4');  
    return res.json({
        videoURL: wholeBlobURL,
        transcript,
        status: 'Video processing completed'
      });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      Msg: 'Server error: ' + error.message
    });
  };

}
