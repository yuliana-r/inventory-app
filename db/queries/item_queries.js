const pool = require('../pool');

async function getAllItems() {
  const { rows } = await pool.query(`
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
`);

  return rows;
}

async function getItemById(id) {
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
    WHERE items.item_id = $1
  `,
    [id]
  );

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
