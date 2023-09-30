const { createServer } = require('http');
const app = require('./app');
const {mongoConnect} = require('./services/mongo.db');
const upload = require('./config/multer');

const port = process.env.PORT || 8080;

const server = createServer(app);

function startServer (){
    mongoConnect();

    server.listen(port, () => {
        console.log(`starting server on http://localhost:${port}`);
    });
};

startServer();
