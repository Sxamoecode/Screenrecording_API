const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
    console.log('Mongodb Online...');
});
/*
const conn = mongoose.createConnection(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});*/

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;

// Create GridFS stream
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
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