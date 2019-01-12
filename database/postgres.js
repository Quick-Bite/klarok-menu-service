const { Client } = require('pg');
const client = new Client({
    user: 'sdc',
    host: 'localhost',
    database: 'sdc'
});
client.connect();

async function res() {
    const r = await client.query('SELECT NOW()');
    console.log(r.rows);
    return r;
}

async function sample() {
    const r = await client.query('SELECT name FROM menu WHERE restaurant_id = 3 AND item_id = 2');
    console.log(r.rows);
}

module.exports.res = res;
module.exports.sample = sample;