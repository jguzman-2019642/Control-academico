const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Teacher = require('../models/teacher');

const teacherGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, teacher] = await Promise.all([
        Teacher.countDocuments(query),
        Teacher.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        teacher
    });
}

const getTeacherByid = async (req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findOne({ _id: id });

    res.status(200).json({
        teacher
    })
}

const teacherPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, correo, ...resto } = req.body;

    await Teacher.findByIdAndUpdate(id, resto);

    const teacher = await Teacher.findOne({ _id: id });

    res.status(200).json({
        msg: 'Teacher actualizado exitosamente',
        teacher
    });
}


const teacherDelete = async (req, res) => {
    const { id } = req.params;

    await Teacher.findByIdAndUpdate(id, { estado: false });
    const teacher = await Teacher.findOne({ _id: id });
    res.status(200).json({
        msg: 'Teacher eliminado exitosamente',
        teacher
    });
}

const teacherPost = async (req, res) => {
    const { nombre, correo, password, asignatura, role } = req.body;

    const teacher = new Teacher({ nombre, correo, password, asignatura, role });

    const salt = bcryptjs.genSaltSync();
    teacher.password = bcryptjs.hashSync(password, salt);

    await teacher.save();
    res.status(200).json({
        teacher
    });
}


module.exports = {
    teacherGet,
    getTeacherByid,
    teacherPut,
    teacherDelete,
    teacherPost
}