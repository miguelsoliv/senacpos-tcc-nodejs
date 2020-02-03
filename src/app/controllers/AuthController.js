const User = require('../models/User')

/*
index (listar)
show (único registro retornado)
store (criação)
update (alteração)
destroy (exclusão)
*/

module.exports = {
  async authenticate(request, response) {
    try {
      const { email, password } = request.body

      const user = await User.findOne({ email }).select('+password')

      if (!user) {
        return response.json({ message: 'User not found' })
      }

      if (!(await user.compareHash(password))) {
        return response.json({ message: 'Invalid password' })
      }

      user.password = undefined

      return response.json({
        user,
        token: user.generateToken()
      })
    } catch {
      return response.status(400).json({ message: 'User authentication failed' })
    }
  }
}
