const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use('/api',routes)

console.log('Api rodando em http://localhost:8080/api/')
app.listen(8080)