require('dotenv').config();
const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'acta',
    password: 12345678,
    port: 5432
});

module.exports = {
    pool
}