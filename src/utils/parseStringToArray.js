module.exports = (arrayAsString, splitCharacter = ',') => {
  return arrayAsString.split(splitCharacter).map(string => string.trim())
}
