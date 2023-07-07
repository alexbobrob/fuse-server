const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const io = require('socket.io');
const routes = require('./routes');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

app.use('/api/v1', routes);

const server = app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

const socketIo = io(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
    // credentials: true,
  },
});

socketIo.on('connection', (socket) => {
  console.log('Connected to socket.io');

  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log(`User Joined Room: ${room}`);
  });

  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageRecieved) => {
    const { chat } = newMessageRecieved;

    if (!chat.users) return console.log('chat.users not defined');

    chat.users.forEach((user) => {
      if (user.id === newMessageRecieved.sender.id) return;

      socket.in(user.id).emit('message recieved', newMessageRecieved);
    });
  });

  socket.off('setup', (userData) => {
    console.log('USER DISCONNECTED');
    socket.leave(userData._id);
  });
});
