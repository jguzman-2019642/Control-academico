const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { usuarioPost, usuarioGet, getUsuarioByid, usuariosPut, usuariosDelete } = require('../controllers/user.controller');
const { existeUsuarioById, existenteEmail, esRolValido } = require('../helpers/db-validator');
const { validarJWT } = require('../middlewares/validad-jwt');
const { tieneRole } = require('../middlewares/validar-roles');

const router = Router();

router.get("/", usuarioGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], getUsuarioByid);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], usuariosPut);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE','STUDENT_ROLE'),
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], usuariosDelete);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe de ser mayoy a 6 caracteres").isLength({ min: 6, }),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos
    ], usuarioPost);

module.exports = router;