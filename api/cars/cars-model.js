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

const create = async (car) => {
  const [ id ] = await db('cars')
    .insert({
      vin: car.vin.trim(),
      make: car.make.trim(),
      model: car.model.trim(),
      mileage: car.mileage,
      title: car.title.trim(),
      transmission: car.transmission.trim()
    })
  return getById(id)
}

module.exports = {
  getAll,
  getById,
  create
}