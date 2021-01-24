const jwt = require('jsonwebtoken');
require('dotenv').config();

const generarJWT = (id_usuario, nombre, apellido, correo) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id_usuario,
            nombre,
            apellido,
            correo
        }
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    })
}

module.exports = {
    generarJWT
}