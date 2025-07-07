const pool = require('../pool');

async function getTotalCategories() {
  const { rows } = await pool.query('SELECT COUNT (name) FROM categories');
  return rows[0].count;
}

async function getTotalItems() {
  const { rows } = await pool.query('SELECT COUNT (name) FROM items');
  return rows[0].count;
}

async function getTotalBrands() {
  const { rows } = await pool.query('SELECT COUNT (name) FROM brands');
  return rows[0].count;
}

async function getTotalPieces() {
  const { rows } = await pool.query('SELECT SUM (qty) FROM items WHERE unit_id = 2');
  return rows[0].sum;
}

async function getTotalBags() {
  const { rows } = await pool.query('SELECT SUM (qty) FROM ITEMS WHERE unit_id = 4');
  return rows[0].sum;
}

async function getTotalKg() {
  const { rows } = await pool.query('SELECT SUM (qty) FROM ITEMS WHERE unit_id = 3');
  return rows[0].sum;
}

async function getTotalGrams() {
  const { rows } = await pool.query('SELECT SUM (qty) FROM ITEMS WHERE unit_id = 1');
  return rows[0].sum;
}

async function getTotalLitres() {
  const { rows } = await pool.query('SELECT SUM (qty) FROM ITEMS WHERE unit_id = 6');
  return rows[0].sum;
}

async function getTotalMl() {
  const { rows } = await pool.query('SELECT SUM (qty) FROM ITEMS WHERE unit_id = 5');
  return rows[0].sum;
}

module.exports = {
  getTotalCategories,
  getTotalItems,
  getTotalBrands,
  getTotalPieces,
  getTotalBags,
  getTotalKg,
  getTotalGrams,
  getTotalLitres,
  getTotalMl,
};
