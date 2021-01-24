require('dotenv').config();
const { Pool, Client } = require('pg');

// const pool = new Pool({
//     user: process.env.USER,
//     host: process.env.HOST,
//     database: 'actas',
//     password: process.env.PASSWORD,
//     port: 5432
// });

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'acta',
    password: 12345678,
    port: 5432
});
module.exports = {
    pool
    // poolEnv
}