const User = require('../models/User')

/*
index (listar)
show (único registro retornado)
store (criação)
update (alteração)
destroy (exclusão)
*/

module.exports = {
  async update(request, response) {
    const { id } = request.params
    const { name, email, password } = request.body

    const updatedData = {}

    if (name) updatedData.name = name

    if (email) {
      let user = await User.findOne({ email })

      if (user) {
        return response.json({ message: 'User already exists' })
      }

      updatedData.email = email
    }

    if (password) updatedData.password = password

    const user = await User.findByIdAndUpdate(id, updatedData)

    return response.json(user)
  }
}
