const User = require('../models/User')

const { parseHoursToArray } = require('../../utils')

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
        const hoursArray = parseHoursToArray(schedule.hours)

        const buffer = Buffer.from(photo_url, 'base64')

        user = await User.create({
          name,
          email,
          password,
          photo_url: buffer,
          services,
          schedule: {
            days: schedule.days,
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
