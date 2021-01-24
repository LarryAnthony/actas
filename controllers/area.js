const { pool } = require('../database/config');

const obtenerAreaPorId = async (req, res) => {
    const id_area = req.params.id;

    try {
        const area = (await pool.query({ text: 'SELECT id_area, nombre FROM public.area WHERE id_area=$1;', values: [id_area] })).rows;
        if (area.length > 0) {
            res.status(200).json({
                ok: true,
                data: area
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

const obtenerAreas = async (req, res) => {
    try {
        const areas = (await pool.query({ text: 'SELECT id_area, nombre FROM public.area;' })).rows;
        res.status(200).json({
            ok: true,
            data: areas
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión'
        });
    }
}

const crearArea = async (req, res) => {
    const { nombre } = req.body;

    try {
        const area = (await pool.query({ text: 'SELECT id_area, nombre, nombre FROM public.area WHERE nombre=$1;', values: [nombre] })).rows;
        if (area.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Área ya existe'
            })
        }
        await pool.query({ text: 'INSERT INTO public.area(nombre) VALUES ($1);', values: [nombre] });
        res.status(200).json({
            ok: true,
            msg: `Área ${nombre} creado`
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión'
        });
    }
}

const eliminarArea = async (req, res) => {
    const id_area = req.params.id;

    try {
        const area = (await pool.query({ text: 'SELECT id_area, nombre, nombre FROM public.area WHERE id_area=$1;', values: [id_area] })).rows;
        if (area.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El área no existe'
            });
        }
        await pool.query({ text: 'DELETE FROM public.area WHERE id_area = $1;', values: [id_area] });
        res.status(200).json({
            ok: true,
            msg: `Área ${area[0].nombre} eliminado`
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión'
        });
    }

}

const actualizarArea = async (req, res) => {
    const id_area = req.params.id;
    const nombre = req.body.nombre;

    try {
        const area = (await pool.query({ text: 'SELECT id_area, nombre, nombre FROM public.area WHERE id_area=$1;', values: [id_area] })).rows;
        if (area.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El área no existe'
            });
        }
        await pool.query({ text: 'UPDATE public.area SET nombre=$1 WHERE id_area=$2;', values: [nombre, id_area] });
        res.status(200).json({
            ok: true,
            msg: `Área ${nombre} actualizado`
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión'
        });
    }
}

module.exports = {
    obtenerAreaPorId,
    crearArea,
    eliminarArea,
    actualizarArea,
    obtenerAreas
}