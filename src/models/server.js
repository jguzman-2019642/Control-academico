const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.studentsPath = '/api/student';
        this.cursosPath = '/api/cursos';
        this.authPath = '/api/auth';
        this.teacherPath = '/api/teacher';

        this.connectarDB();
        this.middlewares();
        this.routes();

    }

    async connectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user.routes'));
        this.app.use(this.studentsPath, require('../routes/student.routes'));
        this.app.use(this.cursosPath, require('../routes/cursos.routes'));
        this.app.use(this.authPath,require('../routes/auth.routes'));
        this.app.use(this.teacherPath,require('../routes/teacher.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutado y escuchado');
        })
    }
}

module.exports = Server;
