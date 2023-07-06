const express = require('express');
const authRoute = require('./auth/auth.routes');
const userRoutes = require('./user/user.routes');
const agencyRoutes = require('./agency/agency.routes');
const chatRoutes = require('./chat/chat.routes');
const messageRoutes = require('./message/message.routes');

const router = express.Router();

const routes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/agencies',
    route: agencyRoutes,
  },
  {
    path: '/chats',
    route: chatRoutes,
  },
  {
    path: '/messages',
    route: messageRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
