const { pool } = require('../database/config');

const obtenerUsuarioPorProyecto = async (req, res) => {
    const id_proyecto = req.params.id;
    try {
        if (id_proyecto.length > 10) {
            return res.status(400).json({
                ok: false,
                msg: `Seleccione un proyecto`
            });
        }
        const usuarioProyecto = (await pool.query({ text: 'SELECT a.id_usuario_proyecto, a.estado, a.id_proyecto, a.id_usuario, b.nombre, b.apellido FROM public.usuario_proyecto as a, public.usuario AS b WHERE a.id_proyecto=$1 AND b.id_usuario = a.id_usuario;', values: [id_proyecto] })).rows;
        res.status(200).json({
            ok: true,
            data: usuarioProyecto
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión',
            error: error
        });
    }
}

const crearUsuarioProyecto = async (req, res) => {
    const id_proyecto = req.params.id;
    const id_usuario = req.body.id_usuario;
    const estado = true;
    try {
        if (id_proyecto.length === 0 || id_usuario === 0 || id_usuario === undefined) {
            return res.status(400).json({
                ok: false,
                msg: `Ingresar valores en los campos`
            });
        }
        const usuarioProyecto = (await pool.query({ text: 'SELECT * FROM public.usuario_proyecto WHERE id_proyecto=$1 AND id_usuario=$2;', values: [id_proyecto, id_usuario] })).rows;
        if (usuarioProyecto.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya pertenece al proyecto'
            })
        }
        await pool.query({ text: 'INSERT INTO public.usuario_proyecto(id_proyecto, id_usuario, estado) VALUES ($1, $2, $3);', values: [id_proyecto, id_usuario, estado] });
        res.status(200).json({
            ok: true,
            msg: `Usuario asignado a proyecto`
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión'
        });
    }
}

const actualizarEstadoUsuarioProyecto = async (req, res) => {
    const id_usuario_proyecto = req.params.id;
    let nuevoEstado = true;
    try {
        const usuarioProyecto = (await pool.query({ text: 'SELECT * FROM public.usuario_proyecto WHERE id_usuario_proyecto = $1;', values: [id_usuario_proyecto] })).rows;
        if (usuarioProyecto.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe usuario asignado a proyecto'
            })
        }
        if (usuarioProyecto[0].estado === true) {
            nuevoEstado = false;
        } else {
            nuevoEstado = true;
        }
        await pool.query({ text: 'UPDATE public.usuario_proyecto SET estado=$1 WHERE id_usuario_proyecto=$2;', values: [nuevoEstado, id_usuario_proyecto] });
        res.status(200).json({
            ok: true,
            msg: `Usuario - proyecto actualizado`
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión1'
        });
    }
}

module.exports = {
    obtenerUsuarioPorProyecto,
    crearUsuarioProyecto,
    actualizarEstadoUsuarioProyecto
}