const { pool } = require('../database/config');

const crearActa = async (req, res) => {
    const fecha_emision = new Date();
    const id_proyecto = req.params.id;
    try {
        await pool.query({ text: 'INSERT INTO public.acta(fecha_emision, id_proyecto) VALUES ($1, $2);', values: [fecha_emision, id_proyecto] });
        res.status(200).json({
            ok: true,
            msg: `Acta creada`
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas de conexión'
        });
    }
}

module.exports = {
    crearActa
}