const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.todosPath = '/api/todos';

        // Middlewares
        this.middlewares();

        // Routes of my app
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Read and parser of body
        this.app.use( express.json() );
    }

    routes() {
        this.app.use( this.todosPath, require('../routes/todos') );
    }

    startServer() {
        this.app.listen(this.port, () => {
            console.log('Server running in PORT', this.port);
        })
    }
}

module.exports = Server;