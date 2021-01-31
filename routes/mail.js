const { enviarEmail } = require('../controllers/mail');
const { Router } = require('express');

const router = Router();

router.post('/email', enviarEmail);

module.exports = router;