const jwt = require('jsonwebtoken');
const moment = require('moment');
const { generarJWT } = require('../helpers/jwt');
require('dotenv').config();

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(400).json({
            ok: false,
            msg: 'Favor ingresar token'
        });
    }
    try {
        const { id_usuario, nombre, apellido, correo } = jwt.verify(token, process.env.JWT_SECRET);
        req.id_usuario = id_usuario;
        req.nombreUsuario = nombre;
        req.apellidoUsuario = apellido;
        req.correoUsuario = correo;

    } catch (error) {
        return res.status(402).json({
            ok: false,
            msg: 'Problemas con el token, no válido'
        });
    }
    next();
}

const validarToken = async (token) => {
    try {
        const payload = jwt.decode(token, process.env.JWT_SECRET);
        if (payload.exp >= moment().unix()) {
            const newToken = await generarJWT(payload.id_usuario, payload.nombre, payload.apellido, payload.correo);
            return {
                ok: true,
                id_usuario: payload.id_usuario,
                nombre: payload.nombre,
                apellido: payload.apellido,
                correo: payload.correo,
                token: newToken
            };
        }
        return false;
    } catch (e) {
        return false;
    }
}

module.exports = {
    validarJWT,
    validarToken
}