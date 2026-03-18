// const pool = require('../config/db');

// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const result = await pool.query(
//       'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
//       [name, email, password]
//     );

//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };









const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 🔐 SIGNUP
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    res.json({
      message: "User created successfully ✅",
      user: result.rows[0]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔐 LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const user = result.rows[0];

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password ❌" });
    }

    // generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: "Login successful ✅",
      token
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};