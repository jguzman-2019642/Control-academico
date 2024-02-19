const { Schema, model } = require("mongoose");
const CursosSchema = Schema({


    nombre: {
        type: String,
        required: [true, 'El nombre del curso es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Cursos', CursosSchema)