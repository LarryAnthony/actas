const { Router } = require('express');
const { obtenerAreaPorId, crearArea, eliminarArea, actualizarArea, obtenerAreas } = require('../controllers/area');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/area', validarJWT, obtenerAreas);
router.get('/area/:id', validarJWT, obtenerAreaPorId);
router.post('/area', validarJWT, crearArea);
router.delete('/area/:id', validarJWT, eliminarArea);
router.put('/area/:id', validarJWT, actualizarArea);

module.exports = router
