const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require("../models/usuario");
const bycriptjs = require('bcryptjs');

const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
        //Verificar correo exista
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: 'El correo no esta registrado'
            });
        }

        // Verificar usuario activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario no existe en la base de datos'
            });
        }

        // Verificar contraseña correcta

        const validPassword = bycriptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }

        //
        const token = await generarJWT(usuario.id);
        

        res.status(200).json({
            msg: 'Login',
            usuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Comunicarce con el encagdado'
        })
    }
}



module.exports = { login }