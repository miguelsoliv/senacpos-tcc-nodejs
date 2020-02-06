const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { promisify } = require('util')

const User = require('../models/User')
const mailer = require('../../modules/mailer')
const mailMessageTemplate = require('../../utils/mailMessageTemplate')
const mailConfig = require('../../config/mail')
const authConfig = require('../../config/auth')

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

      const user = await User.findOne({ email })
        .select('+password +generatedPassword +generatedPasswordExpireAt')

      if (!user) {
        return response.json({ message: 'User not found' })
      }

      const now = new Date()
      let isPassOk = false

      if (user.generatedPassword) {
        if (now > user.generatedPasswordExpireAt) {
          return response.json({ message: 'Token expired, generate a new one' })
        }

        if (await user.compareHash(password, false)) {
          isPassOk = true
        }
      }

      if (!isPassOk) {
        if (await user.compareHash(password)) {
          isPassOk = true
        }
      }

      if (!isPassOk) {
        return response.json({ message: 'Invalid password' })
      }

      user.password = undefined
      user.generatedPassword = undefined
      user.generatedPasswordExpireAt = undefined

      await User.findByIdAndUpdate(user.id, {
        '$set': {
          generatedPassword: undefined,
          generatedPasswordExpireAt: undefined
        }
      })

      return response.json({
        user,
        token: user.generateToken()
      })
    } catch {
      return response.status(400).json({ message: 'User authentication failed' })
    }
  },
  async forgotPassword(request, response) {
    const { email } = request.body

    const user = await User.findOne({ email })

    if (!user) {
      return response.json({ message: 'User not found' })
    }

    const passwordLength = Math.random() * (12 - 6) + 6
    const randomPassword = Math.random().toString(36).substr(2, passwordLength)
    const hashedPassword = await bcrypt.hash(randomPassword, 8)

    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 3)

    await User.findByIdAndUpdate(user.id, {
      '$set': {
        generatedPassword: hashedPassword,
        generatedPasswordExpireAt: expiresAt
      }
    })

    mailer.sendMail({
      from: `Suporte - Boutique do Esmalte <${mailConfig.user}>`,
      to: email,
      subject: 'Esqueceu sua senha?',
      html: mailMessageTemplate(randomPassword)
    }, (err) => {
      if (err) {
        return response.status(400).json({ message: 'Could not send forgot password email' })
      }

      return response.json({ email: 'Email successfully sent' })
    })
  },
  async validateToken(request, response) {
    const { token } = request.body

    try {
      await promisify(jwt.verify)(token, authConfig.secret)
      return response.json({ message: 'Valid token' })
    } catch {
      return response.status(401).send({ message: 'Invalid token' })
    }
  }
}
