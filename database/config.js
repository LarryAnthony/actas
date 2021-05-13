require('dotenv').config();
const { Pool, Client } = require('pg');

// const pool = new Pool({
//     user: process.env.USER,
//     host: process.env.DB,
//     database: 'actas',
//     password: process.env.PASSWORD,
//     port: 5432,
//     ssl: { rejectUnauthorized: false }
// });
const pool = new Pool({
	user: 'postgres',
	host: '143.198.118.248',
	database: 'acta',
	password: 'chili123',
	port: 5432,
	ssl: { rejectUnauthorized: false }
});

const poolEnv = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'acta',
	password: 12345678,
	port: 5432
});
module.exports = {
	pool,
	poolEnv
}