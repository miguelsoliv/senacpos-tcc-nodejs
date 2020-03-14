module.exports = (scheduleHoursArray) => {
  const hoursArray = []

  scheduleHoursArray.forEach((hourDayInterval) => {
    if (!hourDayInterval) {
      hoursArray.push([''])
      return
    }

    const hourInterval = hourDayInterval.split(';')

    const arrayOfHours = []
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

          arrayOfHours.push(`${startHour}:${startMinutes == 0 ?
            `${startMinutes.toString()}0` : startMinutes}`)
        }
      }
    }

    hoursArray.push(arrayOfHours)
  })

  return hoursArray
}
