const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');
const admin = require('firebase-admin');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.todosPath = '/api/todos';
        // this.authPath = '/api/auth';

        // Database connection
        this.connectDatabase();

        // Initialize Firebase
        this.initializeFirebase();

        // Middlewares
        this.middlewares();

        // Routes of my app
        this.routes();
    }

    async connectDatabase() {
        await dbConnection();
    }

    initializeFirebase() {
        // Configuración de Firebase Admin utilizando las credenciales de servicio
        const serviceAccount = require('../serviceAccountKey.json');

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        console.log('Firebase inizializated');
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Read and parser of body
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.todosPath, require('../routes/todos'));
        // this.app.use(this.authPath, require('../routes/auth'));
    }

    startServer() {
        this.app.listen(this.port, () => {
            console.log('Server running in PORT', this.port);
        })
    }
}

module.exports = Server;