const pool = require('../pool');

async function getAllItems() {
  const { rows } = await pool.query('SELECT * FROM items');
  return rows;
}

async function getItemById(id) {
  const { rows } = await pool.query('SELECT * FROM items WHERE item_id = $1', [id]);
  return rows[0];
}

async function insertItem(name, qty, unit_id, category_id, brand_id) {}

async function updateItem(id, name, qty, unit_id, category_id, brand_id) {}

async function deleteItem(id) {
  await pool.query('DELETE FROM items WHERE item_id = $1', [id]);
}

module.exports = {
  getAllItems,
  getItemById,
  insertItem,
  updateItem,
  deleteItem,
};
