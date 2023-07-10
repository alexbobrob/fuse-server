const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const io = require('socket.io');
const routes = require('./routes');
require('dotenv').config();

const port = process.env.PORT || 4000;

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

  socket.on('setup', (loggedInUser) => {
    socket.join(loggedInUser.id);
    console.log(`${loggedInUser.fullName} connection created`);
    socket.emit('connected');
  });

  socket.on('join chat', (loggedInUser, room) => {
    socket.join(room);
    console.log(`${loggedInUser} Joined Room: ${room}`);
  });

  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (message) => {
    const { chat, sender } = message;

    if (!chat.users) return console.log('chat.users not defined');

    chat.users.forEach((user) => {
      if (user._id === sender._id) return;
      console.log('in');
      socket.in(chat._id).emit('message received', message);
    });
  });

  socket.off('setup', (userData) => {
    console.log('USER DISCONNECTED');
    socket.leave(userData.id);
  });
});
