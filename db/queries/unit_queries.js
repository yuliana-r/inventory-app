const pool = require('../pool');

async function getAllUnits() {
  const { rows } = await pool.query('SELECT * FROM units');
  return rows;
}

module.exports = {
  getAllUnits,
};
