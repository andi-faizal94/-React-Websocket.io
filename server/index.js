const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();

app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  allowEIO3: true,
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const activeSockets = new Set();

io.on('connection', (socket) => {
  console.log(`A User connected`);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('send_message', (data) => {
    console.log('Received message:', data.message);
    io.to(data.room).emit('receive_message', { message: data.message });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    activeSockets.delete(socket.id);
  });
});

server.listen(3001, () => console.log('Server Running in port 3000 '));
