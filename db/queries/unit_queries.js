const pool = require('../pool');

async function getAllUnits() {
  const { rows } = await pool.query('SELECT * FROM units ORDER BY name');
  return rows;
}

module.exports = {
  getAllUnits,
};
