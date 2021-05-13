const { pool, poolEnv } = require('../database/config');
const { generarJWT } = require('../helpers/jwt');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
	const { correo, password } = req.body;
	try {
		const usuario = (await pool.query({ text: 'SELECT * FROM public.usuario WHERE correo= $1', values: [correo] })).rows;
		if (usuario.length === 0) {
			return res.status(400).json({
				ok: false,
				msg: 'Credenciales incorrectas'
			});
		}
		const validarUsuario = bcrypt.compareSync(password, usuario[0].password);
		if (!validarUsuario) {
			return res.status(400).json({
				ok: false,
				msg: 'Credenciales incorrectas'
			});
		}
		const token = await generarJWT(usuario[0].id_usuario, usuario[0].nombre, usuario[0].apellido, usuario[0].correo);
		res.json({
			ok: true,
			token,
		});
	} catch (error) {
		console.log(error.error.msg)
		res.status(500).json({
			ok: false,
			msg: 'Problemas al conectarse con BD 1',
			error
		});
	}
}

const login_env = async (req, res) => {

	const { correo, password } = req.body;
	try {
		const usuario = (await poolEnv.query({ text: 'SELECT * FROM public.usuario WHERE correo= $1', values: [correo] })).rows;
		if (usuario.length === 0) {
			return res.status(400).json({
				ok: false,
				msg: 'Credenciales incorrectas'
			});
		}
		const validarUsuario = bcrypt.compareSync(password, usuario[0].password);
		if (!validarUsuario) {
			return res.status(400).json({
				ok: false,
				msg: 'Credenciales incorrectas'
			});
		}
		const token = await generarJWT(usuario[0].id_usuario, usuario[0].nombre, usuario[0].apellido, usuario[0].correo);
		res.json({
			ok: true,
			token,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Problemas al conectarse con BD',
			error
		});
	}
}


const renewToken = async (req, res) => {
	const id_usuario = req.id_usuario;
	const nombre = req.nombreUsuario;
	const apellido = req.apellidoUsuario;
	const correo = req.correoUsuario;

	const token = await generarJWT(id_usuario, nombre, apellido, correo);

	const usuario = (await pool.query({ text: 'SELECT * FROM public.usuario WHERE id_usuario= $1', values: [id_usuario] })).rows;

	res.json({
		ok: true,
		token,
		usuario
	})

}

module.exports = {
	login,
	renewToken,
	login_env
}