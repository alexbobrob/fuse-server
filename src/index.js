const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')

const app = express()
const port = process.env.PORT || 5000

// setting up middlewares
app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes)
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})
