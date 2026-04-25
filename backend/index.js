const express = require('express')
const cors = require('cors')
require('dotenv').config({ path: __dirname + '/.env' })

const generateRoutes = require('./routes/generate')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api', generateRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})