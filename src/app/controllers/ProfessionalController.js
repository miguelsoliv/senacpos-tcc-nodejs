const User = require('../models/User')

const { parseStringToArray, parseHoursToArray } = require('../../utils')

/*
index (listar)
show (único registro retornado)
store (criação)
update (alteração)
destroy (exclusão)
*/

module.exports = {
  async index(request, response) {
    const { id } = request.params

    const professionals = await User.find({
      _id: { $ne: id },
      services: { $exists: true }
    })

    return response.json(professionals)
  },

  async update(request, response) {
    const { id } = request.params
    const {
      name, email, password, photo_url, services, schedule
    } = request.body

    const updatedData = {}

    if (name) updatedData.name = name

    if (email) {
      let user = await User.findOne({ email })

      if (user) {
        return response.json({ message: 'User already exists' })
      }

      updatedData.email = email
    }

    if (password) updatedData.password = password

    if (photo_url) updatedData.photo_url = photo_url

    if (services) {
      updatedData.services = {}

      if (services.names)
        updatedData.services.names = parseStringToArray(services.names)

      if (services.prices)
        updatedData.services.prices = parseStringToArray(services.prices, ';')
    }

    if (schedule) {
      if (schedule.days)
        updatedData.schedule.days = parseStringToArray(schedule.days)

      if (schedule.hours) {
        const scheduleHoursArray = parseStringToArray(schedule.hours, ';')

        updatedData.schedule.hours = parseHoursToArray(scheduleHoursArray)
      }
    }

    const user = await User.findByIdAndUpdate(id, updatedData)

    return response.json(user)
  }
}
