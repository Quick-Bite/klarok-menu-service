const { Pool } = require('pg');

const pool = new Pool({
  user: 'sdc',
  host: 'localhost',
  database: 'sdc',
  max: 5,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const getMenu = async (params) => {
  const query = 'SELECT * FROM menu WHERE restaurant_id = $1';
  try {
    const menu = await pool.query(query, params);
    return menu.rows;
  } catch (err) {
    console.log('ERROR GETTING MENU', err);
    return err;
  }
};

const getItem = async (params) => {
  const query = `SELECT 
      item_id, restaurant_id, name, price, picture_url, 
      popular, spicy, category, description, 
      required::json, optional::json 
    FROM menu WHERE restaurant_id = $1 AND item_id = $2`;
  try {
    const item = await pool.query(query, params);
    return item.rows[0];
  } catch (err) {
    console.log('ERROR GETTING ITEM', err);
    return err;
  }
};

module.exports = {
  getMenu,
  getItem,
};
