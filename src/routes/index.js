const express = require('express')
const authRoute = require('./auth/auth.routes')
const userRoutes = require('./user/user.routes')

const router = express.Router()

const routes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/users',
        route: userRoutes,
    },
]

routes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router
