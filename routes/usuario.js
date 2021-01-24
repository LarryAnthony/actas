const { Router } = require('express');
const { obtenerUsuarioPorId, obtenerUsuarios, crearUsuario, actualizarUsuario, actualizarEstadoUsuario, validarTokenUsuario } = require('../controllers/usuario');
const { validarJWT, validarToken } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/usuario/:id', validarJWT, obtenerUsuarioPorId);
router.get('/usuario', validarJWT, obtenerUsuarios);
router.post('/usuario', crearUsuario);
router.put('/usuario/:id', validarJWT, actualizarUsuario);
router.put('/usuario/estado/:id', validarJWT, actualizarEstadoUsuario);
router.post('/usuario/validarToken', validarTokenUsuario);

module.exports = router;