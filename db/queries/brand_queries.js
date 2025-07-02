const pool = require('../pool');

async function getAllBrands() {
  const { rows } = await pool.query('SELECT * FROM brands');
  return rows;
}

async function getBrandById(id) {
  const { rows } = await pool.query('SELECT * FROM brands WHERE brand_id = $1', [id]);
  return rows[0];
}

async function insertBrand(name) {}

async function updateBrand(id, name) {}

async function deleteBrand(id) {
  await pool.query('DELETE FROM brands WHERE brand_id = $1', [id]);
}

module.exports = {
  getAllBrands,
  getBrandById,
  insertBrand,
  updateBrand,
  deleteBrand,
};
