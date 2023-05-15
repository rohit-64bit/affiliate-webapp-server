const express = require('express')
const connectToMongo = require('./config/db')
const cors = require('cors')

require('dotenv').config()
const env = process.env

const app = express()
const port = process.env.PORT || 1000

const client = env.CLIENT_URL

app.use(cors({ origin: client }))


app.use(express.json())

connectToMongo()

app.use('/api/auth/admin', require('./routes/manageAdmin'))

app.use('/api/category', require('./routes/manageCategory'))

app.use('/api/product', require('./routes/manageProduct'))


app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})