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
console.log(process.env.PG_USER, process.env.PG_DB, process.env.PG_PASSWORD);
const pool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_DB,
	database: 'acta',
	password: process.env.PG_PASSWORD,
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