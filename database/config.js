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
console.log(process.env.USER, process.env.DB, process.env.PASSWORD);
const pool = new Pool({
	user: process.env.USER,
	host: process.env.DB,
	database: 'acta',
	password: process.env.PASSWORD,
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