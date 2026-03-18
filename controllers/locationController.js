// const pool = require('../config/db');

// exports.saveLocation = async (req, res) => {
//   const { user_id, latitude, longitude } = req.body;

//   try {
//     await pool.query(
//       'INSERT INTO locations (user_id, latitude, longitude) VALUES ($1, $2, $3)',
//       [user_id, latitude, longitude]
//     );

//     res.json({ message: "Location saved" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };











const pool = require('../config/db');

// Existing function (already hai)
exports.saveLocation = async (req, res) => {
  const { user_id, latitude, longitude } = req.body;

  try {
    await pool.query(
      'INSERT INTO locations (user_id, latitude, longitude) VALUES ($1, $2, $3)',
      [user_id, latitude, longitude]
    );

    res.json({ message: "Location saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ NEW: LOCATION HISTORY
exports.getLocationHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM locations WHERE user_id = $1 ORDER BY timestamp DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};