const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const {videoRouter} = require('./routes/getVideo.router');

const app = express();


app.use(logger('dev'));
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: false
}))
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use((error, req, res, next) => {
    res.status(500).json({ error: error.message });
});

app.use(videoRouter);

module.exports = app;