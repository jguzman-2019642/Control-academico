const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { studentGet, studentPost, studentsDelete, studentsPut, getStudentsByid } = require('../controllers/student.controller');
const { existeStudent, existeStudentById } = require('../helpers/db-validator');
const { validateMaxAsignaturaslength, validarCursos } = require('../middlewares/validar-cursos');

const router = Router();

router.get("/", studentGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeStudentById),
        validarCampos
    ], getStudentsByid);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeStudentById),
        validarCampos
    ], studentsPut);


router.delete(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeStudentById),
        validarCampos
    ], studentsDelete);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "el password debe de ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("asignatura", "Asignaturas es obligatorio"),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existeStudent),
        validarCursos
    ], studentPost);

module.exports = router;