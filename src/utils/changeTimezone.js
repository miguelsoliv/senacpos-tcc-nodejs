module.exports = (date, timeZoneRegionName) => {
  const invdate = new Date(date.toLocaleString('en-US', {
    timeZone: timeZoneRegionName
  }) + ' GMT')

  const diff = date.getTime() - invdate.getTime()
  return new Date(date.getTime() - diff)
}
