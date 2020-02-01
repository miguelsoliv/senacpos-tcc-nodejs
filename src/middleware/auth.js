const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).send({ error: 'No token provided' })
  }

  const [scheme, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, 'secret')

    request.userId = decoded.id

    return next()
  } catch {
    return response.status(401).send({ error: 'Token invalid' })
  }
}
