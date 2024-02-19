const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuarioGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}

const getUsuarioByid = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findOne({ _id: id });

    res.status(200).json({
        usuario
    });
}

const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, correo, role, ...resto } = req.body;

    await Usuario.findByIdAndUpdate(id, resto);

    const usuario = await Usuario.findOne({ _id: id });

    res.status(200).json({
        msg: 'Usuario Actualizado exitosamente',
        usuario
    })
}

const usuariosDelete = async (req, res) => {
    const {id} = req.params;
    await Usuario.findByIdAndUpdate(id,{estado: false});

    const usuario = await Usuario.findOne({_id: id});
    const usuarioAutenticado = req.usuario;

    res.status(200).json({
        msg: 'Usuario a eliminar',
        usuario,
        usuarioAutenticado
    });
}

const usuarioPost = async (req, res) => {
    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario ({nombre, correo, password,role});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
        usuario
    });
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuariosDelete,
    usuariosPut,
    getUsuarioByid
}