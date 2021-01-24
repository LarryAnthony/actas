const { Router } = require('express');

const { obtenerUsuarioPorProyecto, crearUsuarioProyecto, actualizarEstadoUsuarioProyecto } = require('../controllers/usuario-proyecto');
const router = Router();


router.get('/usuario-proyecto/:id', obtenerUsuarioPorProyecto);
router.post('/usuario-proyecto/:id', crearUsuarioProyecto);
router.put('/usuario-proyecto/:id', actualizarEstadoUsuarioProyecto);

module.exports = router