const { Router } = require('express');
const { obtenerProyectos, obtenerProyectoPorId, crearProyecto, obtenerProyectosPorIdUsuario, actualizarProyecto } = require('../controllers/proyecto');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/proyecto/:id', validarJWT, obtenerProyectoPorId);
router.get('/proyectos', validarJWT, obtenerProyectos);
router.post('/proyecto', validarJWT, crearProyecto);
router.get('/proyectos/:id', validarJWT, obtenerProyectosPorIdUsuario);
router.put('/proyecto/:id_proyecto', validarJWT, actualizarProyecto);

module.exports = router;