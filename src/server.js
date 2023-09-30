const { createServer } = require('http');
const app = require('./app');

const port = process.env.PORT || 8080;

const server = createServer(app);

function startServer (){

    server.listen(port, () => {
        console.log(`starting server on http://localhost:${port}`);
    });
};

startServer();
