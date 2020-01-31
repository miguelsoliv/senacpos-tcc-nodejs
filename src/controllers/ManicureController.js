const Manicure = require('../models/Manicure')

/*
index (listar)
show (único registro retornado)
store (criação)
update (alteração)
destroy (exclusão)
*/

module.exports = {
  async index(request, response) {
    const manicures = await Manicure.find()

    return response.json(manicures)
  },
  async store(request, response) {
    const { name, photo_url, services, schedule } = request.body

    const scheduleDaysArray = schedule.days.split(',').map(day => day.trim())
    const scheduleHoursArray = schedule.hours.split(';').map(hour => hour.trim())

    const manicure = await Manicure.create({
      name,
      photo_url,
      services,
      schedule: {
        days: scheduleDaysArray,
        hours: scheduleHoursArray
      }
    })

    return response.json(manicure)
  }
}