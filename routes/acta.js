const { Router } = require('express');

const { crearActa } = require('../controllers/acta');
const router = Router();

router.post('/acta', crearActa);

module.exports = router