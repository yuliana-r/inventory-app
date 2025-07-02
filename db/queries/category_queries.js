const pool = require('../pool');

async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
}

async function getCategoryById(id) {
  const { rows } = await pool.query('SELECT * FROM categories WHERE category_id = $1', [id]);
  return rows[0];
}

async function insertCategory(name) {}

async function updateCategory(id, name) {}

async function deleteCategory(id) {
  await pool.query('DELETE FROM categories WHERE category_id = $1', [id]);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  insertCategory,
  updateCategory,
  deleteCategory,
};
