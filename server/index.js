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

io.on('connection', (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message');
  });

  socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});

server.listen(3001, () => console.log('Server Running in port 3000 '));
