const io = require('socket.io-client');

const socket = io('http://localhost:3000');

// connected
socket.on('connect', () => {
  console.log('Connected to server:', socket.id);

  // 🔥 Send location
  socket.emit('send-location', {
    user_id: 1,
    latitude: 30.7,
    longitude: 76.7
  });
});

// receive broadcast
socket.on('receive-location', (data) => {
  console.log('Received location:', data);
});