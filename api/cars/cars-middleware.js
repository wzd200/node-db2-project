const Car = require('./cars-model')

const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  const car = await Car.getById(req.params.id)
    if (!car) {
        return res.status(404).json({
            message: `car with id ${req.params.id} is not found`
        })
    } else {
        req.car = car
        next()
    }
}

const checkCarPayload = (req, res, next) => {
  const res400 = res.status(400)
  if (!req.body.vin) {
    return res400.json({
      message: 'vin is missing'
    })
  } else if (!req.body.make) {
    return res400.json({
      message: 'make is missing'
    })
  } else if (!req.body.model) {
    return res400.json({
      message: 'model is missing'
    })
  } else if (!req.body.mileage) {
    return res400.json({
      message: 'mileage is missing'
    })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const validate = vinValidator.validate(req.body.vin)
  if (validate) {
    next()
  } else {
    return res.status(400).json({
      message: `vin ${req.body.vin} is invalid`
    })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const cars = await Car.getAll()
  cars.forEach(car => {
    if (car.vin === req.body.vin) {
      return res.status(400).json({
        message: `vin ${req.body.vin} already exists`
      })
    }
  })
  next()
}

module.exports = {
  checkCarId,
  checkVinNumberValid,
  checkVinNumberUnique,
  checkCarPayload
}