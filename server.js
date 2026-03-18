// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const pool = require('./config/db');
// const placeRoutes = require('./routes/placeRoutes');
// const weatherRoutes = require('./routes/weatherRoutes');

// // Routes import
// const userRoutes = require('./routes/userRoutes');
// const locationRoutes = require('./routes/locationRoutes');
// const sosRoutes = require('./routes/sosRoutes');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());


// // ✅ HOME ROUTE
// app.get('/', (req, res) => {
//   res.send('Backend Running 🚀');
// });


// // ✅ DATABASE TEST ROUTE (KEEP THIS)
// app.get('/test-db', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT NOW()');
//     res.json({
//       message: "Database connected ✅",
//       time: result.rows[0]
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // ✅ API ROUTES
// app.use('/api', userRoutes);
// app.use('/api', locationRoutes);
// app.use('/api', sosRoutes);
// app.use('/api', placeRoutes);
// app.use('/api', weatherRoutes);


// // ❌ OPTIONAL: 404 HANDLER (GOOD PRACTICE)
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found ❌" });
// });


// // SERVER START
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });










require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const pool = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRoutes');
const sosRoutes = require('./routes/sosRoutes');
const placeRoutes = require('./routes/placeRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const server = http.createServer(app);

// 🔥 Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', locationRoutes);
app.use('/api', sosRoutes);
app.use('/api', placeRoutes);
app.use('/api', weatherRoutes);
app.use('/api', adminRoutes);

// ✅ Socket connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // 📍 Receive live location
  socket.on('send-location', async (data) => {
    console.log("Live Location:", data);

    // optional: DB me save bhi kar sakte ho
    await pool.query(
      'INSERT INTO locations (user_id, latitude, longitude) VALUES ($1, $2, $3)',
      [data.user_id, data.latitude, data.longitude]
    );

    // 🔥 Broadcast to all users
    io.emit('receive-location', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});