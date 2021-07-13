const express = require('express')
const router = express.Router()
const Car = require('./cars-model')
const {
    checkCarId,
    checkVinNumberValid,
    checkVinNumberUnique,
    checkCarPayload
} = require('./cars-middleware')

router.get('/', async (req, res, next) => {
    try {
      const cars = await Car.getAll()
      res.json(cars)
    } catch (err) {
      next(err)
    }
})

router.get('/:id', checkCarId, (req, res) => {
    res.json(req.car)
})

router.post('/', 
    checkVinNumberUnique, 
    checkCarPayload,
    checkVinNumberValid, 
    async (req, res, next) => {
    try {
      const newCar = await Car.create(req.body)
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
