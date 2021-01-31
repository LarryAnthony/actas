const { pool, poolEnv } = require('../database/config');
const { validarToken } = require('../middlewares/validar-jwt')
const bcrypt = require('bcrypt');

const obtenerUsuarioPorId = async (req, res) => {
    const id_usuario = req.params.id;

    try {
        const usuario = (await pool.query({ text: 'SELECT * FROM public.usuario WHERE id_usuario=$1;', values: [id_usuario] })).rows;
        if (usuario.length > 0) {
            res.status(200).json({
                ok: true,
                data: usuario
            });
        } else {
            res.status(400).json({
                ok: false,
                msg: 'No existe información'
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión'
        });
    }
}

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = (await pool.query({ text: 'SELECT * FROM public.usuario;' })).rows;
        res.status(200).json({
            ok: true,
            data: usuarios
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión'
        });
    }
}

const crearUsuario = async (req, res) => {
    const { nombre, apellido, correo, password, fecha_nacimiento, id_area } = req.body;
    const estado = true;
    const hash = bcrypt.hashSync(password, 10);
    try {
        const usuario = (await pool.query({ text: 'SELECT * FROM public.usuario WHERE correo=$1 ;', values: [correo] })).rows;
        if (usuario.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario ya existe'
            })
        }
        await pool.query({ text: 'INSERT INTO public.usuario(nombre, apellido, fecha_nacimiento, id_area, correo, password, estado) VALUES ($1, $2, $3, $4, $5, $6, $7);', values: [nombre, apellido, fecha_nacimiento, id_area, correo, hash, estado] });
        res.status(200).json({
            ok: true,
            msg: `Usuario ${nombre} ${apellido} creado`
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión',
            error
        });
    }
}
const crearUsuario_env = async (req, res) => {
    const { nombre, apellido, correo, password, fecha_nacimiento, id_area } = req.body;
    const estado = true;
    const hash = bcrypt.hashSync(password, 10);
    try {
        const usuario = (await poolEnv.query({ text: 'SELECT * FROM public.usuario WHERE correo=$1 ;', values: [correo] })).rows;
        if (usuario.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario ya existe'
            })
        }
        await poolEnv.query({ text: 'INSERT INTO public.usuario(nombre, apellido, fecha_nacimiento, id_area, correo, password, estado) VALUES ($1, $2, $3, $4, $5, $6, $7);', values: [nombre, apellido, fecha_nacimiento, id_area, correo, hash, estado] });
        res.status(200).json({
            ok: true,
            msg: `Usuario ${nombre} ${apellido} creado`
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión',
            error
        });
    }
}

const actualizarUsuario = async (req, res) => {
    const id_usuario = req.params.id;
    const { nombre, apellido, correo, password, fecha_nacimiento, id_area } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    try {
        const usuario = (await pool.query({ text: 'SELECT * FROM public.usuario WHERE id_usuario=$1;', values: [id_usuario] })).rows;
        if (usuario.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }
        await pool.query({ text: 'UPDATE public.usuario SET nombre=$1, fecha_nacimiento=$2, id_area=$3, correo=$4, password=$5, apellido=$6 WHERE id_usuario=$7;', values: [nombre, fecha_nacimiento, id_area, correo, hash, apellido, id_usuario] });
        res.status(200).json({
            ok: true,
            msg: `Usuario ${nombre} ${apellido} actualizado`
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión 1'
        });
    }
}

const actualizarEstadoUsuario = async (req, res) => {
    const id_usuario = req.params.id;
    let nuevoEstado
    try {
        const usuario = (await pool.query({ text: 'SELECT * FROM public.usuario WHERE id_usuario=$1;', values: [id_usuario] })).rows;
        if (usuario.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }
        if (usuario[0].estado === true) {
            nuevoEstado = false;
        } else {
            nuevoEstado = true;
        }
        await pool.query({ text: 'UPDATE public.usuario SET estado=$1 WHERE id_usuario=$2;', values: [nuevoEstado, id_usuario] });
        res.status(200).json({
            ok: true,
            msg: `Usuario ${usuario[0].nombre} actualizado`
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión'
        });
    }
}
const validarTokenUsuario = async (req, res) => {
    const token = req.body.token;
    if (token != null && token != '') {
        res.status(200).json(await validarToken(token));
    } else {
        res.status(400).json(false);
    }
};

module.exports = {
    obtenerUsuarioPorId,
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    actualizarEstadoUsuario,
    validarTokenUsuario,
    crearUsuario_env
}