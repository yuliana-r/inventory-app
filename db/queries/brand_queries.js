const pool = require('../pool');

async function getAllBrands() {
  const { rows } = await pool.query('SELECT * FROM brands ORDER BY brand_id');
  return rows;
}

async function getBrandById(id) {
  const { rows } = await pool.query('SELECT * FROM brands WHERE brand_id = $1', [id]);
  return rows[0];
}

async function getItemByBrand(id) {
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
    WHERE items.brand_id = $1
  `,
    [id]
  );

  return rows;
}

async function insertBrand(name) {
  await pool.query(`INSERT INTO brands (name) VALUES ($1)`, [name]);
}

async function updateBrand(id, name) {
  await pool.query(`UPDATE brands SET name = $1 WHERE brand_id = $2`, [name, id]);
}

async function deleteBrand(id) {
  await pool.query('DELETE FROM brands WHERE brand_id = $1', [id]);
}

module.exports = {
  getAllBrands,
  getBrandById,
  getItemByBrand,
  insertBrand,
  updateBrand,
  deleteBrand,
};
