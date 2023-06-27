const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('./routes')
require('dotenv').config()

const port = process.env.PORT || 5000

const app = express()

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// enable cors
app.use(cors())

app.use('/api/v1', routes)

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})
