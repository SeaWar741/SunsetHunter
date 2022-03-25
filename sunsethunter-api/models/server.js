
const express = require('express');
const cors = require('cors');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users'

        // Middlewares - Son funciones que añaden más cosas al server
        this.middlewares();

        // Cargamos las rutas
        this.routes();
    }

    middlewares() {

        // CORS - Para limitar las peticiones desde ciertas direcciones
        this.app.use( cors() );

        // Lectura y parseo del body - Toda la información la serializamos a .json
        this.app.use( express.json() );

        // Autentificación con Google
        this.app.use( require('../models/auth'));
        
        // "Use" se utiliza para los middlewares
        // Directorio público
        this.app.use( express.static('public') );
    }

    routes() {
        
        this.app.use( this.usuariosPath, require('../routes/users.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;