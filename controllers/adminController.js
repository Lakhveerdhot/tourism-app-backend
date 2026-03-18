const pool = require('../config/db');

// 👤 Get all users
exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email FROM users ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 📍 Get all locations
exports.getLocations = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM locations ORDER BY timestamp DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🚨 Get all SOS alerts
exports.getSOSAlerts = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM sos_alerts ORDER BY time DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};