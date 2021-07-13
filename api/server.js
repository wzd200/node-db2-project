const express = require("express")
const carsRouter = require('./cars/cars-router')

const server = express()

server.use('/api/cars', carsRouter)

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ api: 'operational' })
})

module.exports = server
