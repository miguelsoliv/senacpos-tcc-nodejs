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
  async store(request, response) {
    try {
      const {
        name, email, password, photo_url, services, schedule
      } = request.body

      let user = await User.findOne({ email })

      if (user) {
        return response.json({ message: 'User already exists' })
      }

      if (services) {
        const servicesNamesArray = parseStringToArray(services.names)
        const servicesPricesArray = parseStringToArray(services.prices, ';')

        const scheduleDaysArray = parseStringToArray(schedule.days)
        const scheduleHoursArray = parseStringToArray(schedule.hours, ';')

        const hoursArray = parseHoursToArray(scheduleHoursArray)

        const imageParts = photo_url.split(',')
        const buffer = Buffer.from(imageParts[1], 'base64')

        user = await User.create({
          name,
          email,
          password,
          photo_url: buffer,
          services: {
            names: servicesNamesArray,
            prices: servicesPricesArray
          },
          schedule: {
            days: scheduleDaysArray,
            hours: hoursArray
          }
        })
      } else {
        user = await User.create({
          name,
          email,
          password
        })
      }

      user.password = undefined

      return response.json({
        user,
        token: user.generateToken()
      })
    } catch {
      return response.status(400).json({ message: 'User registration failed' })
    }
  }
}
