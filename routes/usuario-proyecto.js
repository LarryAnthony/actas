const { Router } = require('express');

const { obtenerUsuarioPorProyecto, crearUsuarioProyecto, actualizarEstadoUsuarioProyecto, obtenerUsuarioPorProyectoActivos } = require('../controllers/usuario-proyecto');
const router = Router();


router.get('/usuario-proyecto/:id', obtenerUsuarioPorProyecto);
router.get('/usuario-proyecto-activos/:id', obtenerUsuarioPorProyectoActivos);
router.post('/usuario-proyecto/:id', crearUsuarioProyecto);
router.put('/usuario-proyecto/:id', actualizarEstadoUsuarioProyecto);

module.exports = router