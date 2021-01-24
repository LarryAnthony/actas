const { Router } = require('express');
const { login, renewToken, login_env } = require('../controllers/login');

const router = Router();

router.post('/login', login);
router.post('/login-env', login_env);

module.exports = router;