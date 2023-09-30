const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

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

module.exports = app;