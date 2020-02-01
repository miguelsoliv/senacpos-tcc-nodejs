module.exports = function parseStringToArray(arrayAsString, splitCharacter = ',') {
  return arrayAsString.split(splitCharacter).map(string => string.trim())
}
