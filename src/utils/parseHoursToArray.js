const parseStringToArray = require('./parseStringToArray')

module.exports = (scheduleHoursArray) => {
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

  return hoursArray
}
