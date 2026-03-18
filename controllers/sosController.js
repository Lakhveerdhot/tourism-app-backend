const pool = require('../config/db');

exports.sendSOS = async (req, res) => {
  const { user_id, latitude, longitude } = req.body;

  try {
    await pool.query(
      'INSERT INTO sos_alerts (user_id, latitude, longitude) VALUES ($1, $2, $3)',
      [user_id, latitude, longitude]
    );

    res.json({ message: "SOS Alert Sent 🚨" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};