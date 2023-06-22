const express = require('express')
const cors = require('cors')
//Set up mongoose connection

const app = express()
const port = process.env.PORT || 5000

//setting up middlewares
app.use(cors())
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})