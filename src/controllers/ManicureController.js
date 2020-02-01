const Manicure = require('../models/Manicure')
const parseStringToArray = require('../utils/parseStringToArray')

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
    try {
      const { name, photo_url, services, schedule } = request.body

      const scheduleDaysArray = parseStringToArray(schedule.days)
      const scheduleHoursArray = parseStringToArray(schedule.hours, ';')

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
    } catch {
      return response.status(400).json({
        message: 'Manicure registration failed'
      })
    }
  }
}
