const { Router } = require('express');
const { crearAcuerdo, actualizarAcuerdo, obtenerAcuerdosPorProyecto, obtenerAcuerdosRestantePorProyecto } = require('../controllers/acuerdo');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/acuerdo/:id', validarJWT, obtenerAcuerdosPorProyecto);
router.get('/acuerdo-restante/:id', validarJWT, obtenerAcuerdosRestantePorProyecto);
router.post('/acuerdo/:id', validarJWT, crearAcuerdo);
router.put('/acuerdo/:id', validarJWT, actualizarAcuerdo);

module.exports = router;