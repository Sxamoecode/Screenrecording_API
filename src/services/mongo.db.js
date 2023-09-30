const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
    console.log('Mongodb Online...');
});

let gfs;
mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('videos');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});


async function mongoConnect() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    });
};

async function mongoDisconnect() {
    await mongoose.disconnect();
}
//mongoConnect();

module.exports = {
    mongoConnect,
    mongoDisconnect,
    gfs,
}