const { Router } = require('express');
const { crearAcuerdo, actualizarAcuerdo, obtenerAcuerdosPorProyecto } = require('../controllers/acuerdo');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/acuerdo/:id', validarJWT, obtenerAcuerdosPorProyecto);
router.post('/acuerdo/:id', validarJWT, crearAcuerdo);
router.put('/acuerdo/:id', validarJWT, actualizarAcuerdo);

module.exports = router;