const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('hallo');
});
const httpServer = createServer();
const io = new Server({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'PATCH', 'DELETE', 'POST'],
  },
});

io.on('connection', (socket) => {});

httpServer.listen(3001, () => console.log('Server Running in port 3000 '));
