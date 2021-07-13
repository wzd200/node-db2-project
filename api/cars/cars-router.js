const express = require('express')
const router = express.Router()
const Car = require('./cars-model')

router.get('/', async (req, res, next) => {
    try {
      const cars = await Car.getAll()
      res.json(cars)
    } catch (err) {
      next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
      const car = await Car.getById(req.params.id)
      res.json(car)
    } catch (err) {
      next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
      const newCar = await Car.create()
      res.json(newCar)
    } catch (err) {
      next(err)
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json(
      { message: err.message, stack: err.stack }
    )
})

module.exports = router
