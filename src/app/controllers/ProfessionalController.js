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

    if (photo_url) {
      const buffer = Buffer.from(photo_url, 'base64')

      updatedData.photo_url = buffer
    }

    if (services) updatedData.services = services

    if (schedule) {
      updatedData.schedule = {
        days: schedule.days,
        hours: parseHoursToArray(schedule.hours)
      }
    }

    const user = await User.findByIdAndUpdate(id, updatedData)

    return response.json(user)
  }
}
