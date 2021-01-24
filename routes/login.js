const { Router } = require('express');
const { login, renewToken } = require('../controllers/login');

const router = Router();

router.post('/login', login);

module.exports = router;