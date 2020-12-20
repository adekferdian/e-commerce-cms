require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
})
module.exports = app;