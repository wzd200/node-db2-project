const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
    .select(
      'id', 
      'vin', 
      'make', 
      'model', 
      'mileage', 
      'title', 
      'transmission'
    )
}

const getById = async (id) => {
  const result = await db('cars')
  .where('id', id).first()
  return result
}

const create = async (newCar) => {
  const [ id ] = await db('cars')
    .insert({
      vin: newCar.vin.trim(),
      make: newCar.make.trim(),
      model: newCar.model.trim(),
      mileage: newCar.mileage,
      title: newCar.title.trim(),
      transmission: newCar.transmission.trim()
    })
  return getById(id)
}

module.exports = {
  getAll,
  getById,
  create
}