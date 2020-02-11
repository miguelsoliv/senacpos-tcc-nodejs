const jwt = require('jsonwebtoken')

const { promisify } = require('util')

module.exports = async (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).send({ message: 'No token provided' })
  }

  const [scheme, token] = authHeader.split(' ')

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).send({ message: 'Token malformatted' })
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    request.userId = decoded.id

    return next()
  } catch {
    return response.status(401).send({ message: 'Invalid token' })
  }
}
