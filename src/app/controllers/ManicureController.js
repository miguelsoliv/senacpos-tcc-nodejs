const Manicure = require('../models/Manicure')

const { parseStringToArray } = require('../../utils')

/*
index (listar)
show (único registro retornado)
store (criação)
update (alteração)
destroy (exclusão)
*/

module.exports = {
  async index(_, response) {
    const manicures = await Manicure.find()

    return response.json(manicures)
  },

  async store(request, response) {
    try {
      const { name, photo_url, services, schedule } = request.body

      const servicesNamesArray = parseStringToArray(services.names)
      const servicesPricesArray = parseStringToArray(services.prices, ';')

      const scheduleDaysArray = parseStringToArray(schedule.days)
      const scheduleHoursArray = parseStringToArray(schedule.hours, ';')

      const hoursArray = []

      scheduleHoursArray.forEach(hourDayInterval => {
        let hoursString = ''
        const hourInterval = hourDayInterval.split(',')

        for (let index = 0; index < hourInterval.length; index++) {
          const hoursParts = hourInterval[index].split('-')

          const startHourInterval = hoursParts[0]
          const endHourInterval = hoursParts[1]

          const startHourParts = startHourInterval.split(':')
          const endHourParts = endHourInterval.split(':')

          let startHour = parseInt(startHourParts[0])
          let startMinutes = parseInt(startHourParts[1])
          const endHour = parseInt(endHourParts[0])
          const endMinutes = parseInt(endHourParts[1])

          for (; startHour <= endHour; startHour++) {
            for (; startHour == endHour ?
              startMinutes <= endMinutes : startMinutes <= 60;
              startMinutes += 15
            ) {
              if (startMinutes == 60) {
                startMinutes = 0
                startHour++
              }

              hoursString += `${startHour}:${startMinutes == 0 ?
                `${startMinutes.toString()}0` : startMinutes},`
            }
          }
        }

        hoursArray.push(
          parseStringToArray(hoursString.substring(0, hoursString.length - 1))
        )
        hoursString = ''
      })

      const manicure = await Manicure.create({
        name,
        photo_url,
        services: {
          names: servicesNamesArray,
          prices: servicesPricesArray
        },
        schedule: {
          days: scheduleDaysArray,
          hours: hoursArray
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
