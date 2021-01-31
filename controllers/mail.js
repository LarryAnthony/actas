const transporter = require('../helpers/mail');

const enviarEmail = async (req, res) => {
    const { asunto, remitentes, cuerpo } = req.body;
    try {
        await transporter.sendMail({
            from: 'Servicio de actas <ajacobozare@gmail.com>', // sender address
            to: remitentes, // list of receivers
            subject: asunto, // Subject line
            // text: cuerpo, // plain text body
            html: cuerpo, // html body
        });

        res.status(200).json({
            ok: true,
            msg: 'Correo enviado'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas con el servidor, revisar si los correos son válidos'
        })
    }
}

module.exports = {
    enviarEmail
}