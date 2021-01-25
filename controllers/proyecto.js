const { pool } = require('../database/config');

const obtenerProyectoPorId = async (req, res) => {
    const id_proyecto = req.params.id;

    try {
        const proyecto = (await pool.query({ text: 'SELECT * FROM public.proyecto WHERE id_proyecto=$1;', values: [id_proyecto] })).rows;
        if (proyecto.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe información'
            });
        }
        res.status(200).json({
            ok: true,
            data: proyecto
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión'
        });
    }
}

const obtenerProyectosPorIdUsuario = async (req, res) => {
    const id_usuario = req.params.id;

    try {
        const proyectos = (await pool.query({ text: 'SELECT a.id_usuario_proyecto, a.id_usuario, a.id_proyecto, b.nombre, a.estado FROM public.usuario_proyecto as a, public.proyecto as b WHERE a.id_usuario=$1 AND a.id_proyecto=b.id_proyecto;', values: [id_usuario] })).rows;
        res.status(200).json({
            ok: true,
            data: proyectos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión',
            error
        });
    }
}


const obtenerProyectos = async (req, res) => {
    try {
        const proyectos = (await pool.query({ text: 'SELECT * FROM public.proyecto;' })).rows;
        res.status(200).json({
            ok: true,
            data: proyectos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión'
        });
    }
}

const crearProyecto = async (req, res) => {
    const { nombre, fecha_inicio, id_usuario } = req.body;
    const estado = true;
    try {

        if (nombre.length === 0 || fecha_inicio.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: `Ingresar valores en los campos`
            });
        }

        const proyecto = (await pool.query({ text: 'SELECT id_proyecto, nombre, fecha_inicio, id_usuario FROM public.proyecto WHERE nombre=$1 AND fecha_inicio=$2 AND id_usuario=$3;', values: [nombre, fecha_inicio, id_usuario] })).rows;
        if (proyecto.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: `Proyecto ya creado`
            });
        }

        await pool.query({ text: 'INSERT INTO public.proyecto(nombre, estado, fecha_inicio, id_usuario) VALUES ($1, $2, $3, $4);', values: [nombre, estado, fecha_inicio, id_usuario] });

        const nuevoProyecto = (await pool.query({ text: 'SELECT id_proyecto, nombre, fecha_inicio, id_usuario FROM public.proyecto WHERE nombre=$1 AND fecha_inicio=$2 AND id_usuario=$3;', values: [nombre, fecha_inicio, id_usuario] })).rows;

        res.status(200).json({
            ok: true,
            msg: `Proyecto ${nombre} creado`,
            id_proyecto: nuevoProyecto[0].id_proyecto
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión',
            error
        });
    }
}

const actualizarProyecto = async (req, res) => {
    const { nombre, fecha_inicio, estado } = req.body;
    const id_proyecto = req.params.id_proyecto;
    console.log(id_proyecto)
    try {
        if (nombre.length === 0 || fecha_inicio.length === 0 || estado.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: `Ingresar valores en los campos`
            });
        }

        const proyecto = (await pool.query({ text: 'SELECT id_proyecto, nombre, fecha_inicio, estado, id_usuario FROM public.proyecto WHERE id_proyecto=$1;', values: [id_proyecto] })).rows;
        console.log(proyecto)
        if (proyecto.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: `Proyecto no existe`
            });
        }

        await pool.query({ text: 'UPDATE public.proyecto SET nombre=$1, fecha_inicio=$2, estado=$3 WHERE id_proyecto=$4;', values: [nombre, fecha_inicio, estado, id_proyecto] });

        res.status(200).json({
            ok: true,
            msg: `Proyecto ${nombre} actualizado`,
        });

    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión',
            error
        });
    }
}

module.exports = {
    obtenerProyectoPorId,
    obtenerProyectos,
    crearProyecto,
    obtenerProyectosPorIdUsuario,
    actualizarProyecto
}