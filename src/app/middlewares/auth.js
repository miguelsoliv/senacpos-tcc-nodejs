const jwt = require('jsonwebtoken')

const { promisify } = require('util')

const authConfig = require('../../config/auth')

module.exports = async (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).send({ error: 'No token provided' })
  }

  const [scheme, token] = authHeader.split(' ')

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).send({ error: 'Token malformatted' })
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)

    request.userId = decoded.id

    return next()
  } catch {
    return response.status(401).send({ error: 'Token invalid' })
  }
}
