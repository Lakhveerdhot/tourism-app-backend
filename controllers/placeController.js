const pool = require('../config/db');

// ➕ Add new place
exports.addPlace = async (req, res) => {
  const { name, description, latitude, longitude } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO places (name, description, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, latitude, longitude]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 📍 Get all places
exports.getPlaces = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM places ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};