const User = require('../models/User')

/*
index (listar)
show (único registro retornado)
store (criação)
update (alteração)
destroy (exclusão)
*/

module.exports = {
  async show(request, response) {
    const { id } = request.params

    try {
      const user = await User.findById(id)

      if (!user) {
        return response.json({ message: 'User not found' })
      }

      return response.json(user)
    } catch {
      return response.status(400).json({ message: 'Can\'t get user info' })
    }
  },

  async store(request, response) {
    try {
      const { name, email, password } = request.body

      let user = await User.findOne({ email })

      if (user) {
        return response.json({ message: 'User already exists' })
      }

      user = await User.create({
        name,
        email,
        password
      })

      user.password = undefined

      return response.json({
        user,
        token: user.generateToken()
      })
    } catch {
      return response.status(400).json({ message: 'User registration failed' })
    }
  },

  async update(request, response) {
    const { id } = request.params
    const { name, email, password } = request.body

    const updatedData = {}

    if (name)
      updatedData.name = name

    if (email)
      updatedData.email = email

    if (password)
      updatedData.password = password

    const user = await User.findByIdAndUpdate(id, updatedData)

    return response.json(user)
  }
}
