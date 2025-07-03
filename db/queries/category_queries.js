const pool = require('../pool');

async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
}

async function getCategoryById(id) {
  const { rows } = await pool.query('SELECT * FROM categories WHERE category_id = $1', [id]);
  return rows[0];
}

async function getItemByCategory(id) {
  const { rows } = await pool.query(
    `
    SELECT 
      items.item_id,
      items.name AS item_name,
      items.qty,
      units.name AS unit_name,
      categories.name AS category_name,
      brands.name AS brand_name
    FROM items
    LEFT JOIN units ON items.unit_id = units.unit_id
    LEFT JOIN categories ON items.category_id = categories.category_id
    LEFT JOIN brands ON items.brand_id = brands.brand_id
    WHERE items.category_id = $1
  `,
    [id]
  );

  return rows;
}

async function insertCategory(name) {}

async function updateCategory(id, name) {}

async function deleteCategory(id) {
  await pool.query('DELETE FROM categories WHERE category_id = $1', [id]);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getItemByCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
};
