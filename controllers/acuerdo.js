const { pool } = require('../database/config');

const obtenerAcuerdosPorProyecto = async (req, res) => {
    const id_proyecto = req.params.id;
    try {
        if (id_proyecto.length > 10) {
            return res.status(400).json({
                ok: false,
                msg: `Seleccione un proyecto`
            });
        }
        const acuerdo = (await pool.query({ text: 'SELECT * FROM public.proyecto WHERE id_proyecto = $1;', values: [id_proyecto] }));
        if (!acuerdo) {
            return res.status(400).json({
                ok: false,
                msg: 'Proyecto no encontrado'
            });
        }
        const acuerdosPorProyecto = (await pool.query({ text: 'SELECT a.id_acuerdo, a.detalle, a.fecha_limite, a.estado, a.id_proyecto, a.id_usuario, b.nombre, a.fecha_creacion FROM public.acuerdo as a, public.usuario as b WHERE a.id_proyecto = $1 AND a.id_usuario=b.id_usuario ORDER BY a.fecha_limite ASC;', values: [id_proyecto] })).rows;
        res.status(200).json({
            ok: true,
            data: acuerdosPorProyecto
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión'
        });
    }
}

const obtenerAcuerdosRestantePorProyecto = async (req, res) => {
    const id_proyecto = req.params.id;
    try {
        if (id_proyecto.length > 10) {
            return res.status(400).json({
                ok: false,
                msg: `Seleccione un proyecto`
            });
        }
        const acuerdo = (await pool.query({ text: 'SELECT * FROM public.proyecto WHERE id_proyecto = $1;', values: [id_proyecto] }));
        if (!acuerdo) {
            return res.status(400).json({
                ok: false,
                msg: 'Proyecto no encontrado'
            });
        }
        const acuerdosPorProyecto = (await pool.query({ text: "SELECT a.id_acuerdo, a.detalle, a.fecha_limite, a.estado, a.id_proyecto, a.id_usuario, b.nombre, a.fecha_creacion FROM public.acuerdo as a, public.usuario as b WHERE a.id_proyecto = $1 AND a.id_usuario=b.id_usuario AND a.estado!='Realizado' ORDER BY a.fecha_limite ASC;", values: [id_proyecto] })).rows;
        res.status(200).json({
            ok: true,
            data: acuerdosPorProyecto
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión'
        });
    }
}

const crearAcuerdo = async (req, res) => {
    const { detalle, fecha_limite, estado, id_usuario } = req.body;
    const fecha_creacion = new Date();
    const id_proyecto = req.params.id;
    try {
        if (detalle.length === 0 || fecha_limite.length === 0 || estado.length === 0 || id_usuario.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: `Ingresar valores en los campos`
            });
        }
        await pool.query({ text: 'INSERT INTO public.acuerdo(detalle, fecha_limite, estado, id_usuario, fecha_creacion, id_proyecto) VALUES ($1, $2, $3, $4, $5, $6);', values: [detalle, fecha_limite, estado, id_usuario, fecha_creacion, id_proyecto] });
        res.status(200).json({
            ok: true,
            msg: `Acuerdo creado`
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión'
        });
    }
}

const actualizarAcuerdo = async (req, res) => {
    const id_acuerdo = req.params.id;
    const { detalle, fecha_limite, estado, id_usuario } = req.body;
    try {

        if (detalle.length === 0 || fecha_limite.length === 0 || estado.length === 0 || id_usuario.length === 0 || id_usuario === undefined || estado === undefined) {
            return res.status(400).json({
                ok: false,
                msg: `Ingresar valores en los campos`
            });
        }

        await pool.query({ text: 'UPDATE public.acuerdo SET detalle=$1, fecha_limite=$2, estado=$3, id_usuario=$4 WHERE id_acuerdo=$5;', values: [detalle, fecha_limite, estado, id_usuario, id_acuerdo] });
        res.status(200).json({
            ok: true,
            msg: `Acuerdo actualizado`
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión'
        });
    }
}

module.exports = {
    crearAcuerdo,
    actualizarAcuerdo,
    obtenerAcuerdosPorProyecto,
    obtenerAcuerdosRestantePorProyecto
}