const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { promisify } = require('util')

const User = require('../models/User')

const mailer = require('../../modules/mailer')

const { mailMessageTemplate, changeTimezone } = require('../../utils')

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

      let user = await User.findOne({ email })
        .select('+password +generatedPassword +generatedPasswordExpireAt')

      if (!user) {
        return response.json({ message: 'User not found' })
      }

      const now = changeTimezone(new Date(), 'America/Sao_Paulo')
      let isPassOk = false

      if (await user.compareHash(password)) {
        isPassOk = true
      }

      if (!isPassOk && !user.generatedPassword) {
        return response.json({ message: 'Invalid password' })
      }

      if (!isPassOk && user.generatedPassword) {
        if (now > user.generatedPasswordExpireAt) {
          return response.json({
            message: 'Reset password token expired, ask for a new one'
          })
        }

        if (!await user.compareHash(password, false)) {
          return response.json({ message: 'Invalid password' })
        }
      }

      user.password = undefined
      user.generatedPassword = undefined
      user.generatedPasswordExpireAt = undefined

      if (user.photo_url) {
        user.photo_url = Buffer.from(user.photo_url).toString('base64')
      }

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
      return response.status(400).json({
        message: 'User authentication failed'
      })
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

    const expiresAt = changeTimezone(new Date(), 'America/Sao_Paulo')
    expiresAt.setHours(expiresAt.getHours() + 4)

    await User.findByIdAndUpdate(user.id, {
      '$set': {
        generatedPassword: hashedPassword,
        generatedPasswordExpireAt: expiresAt
      }
    })

    mailer.sendMail({
      from: `Suporte - Boutique do Esmalte <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Esqueceu sua senha?',
      html: mailMessageTemplate(randomPassword)
    }, (err) => {
      if (err) {
        return response.status(400).json({
          message: 'Could not send forgot password email'
        })
      }

      return response.json({ email: 'Email successfully sent' })
    })
  },

  async validateToken(request, response) {
    const { token } = request.body

    try {
      await promisify(jwt.verify)(token, process.env.JWT_SECRET)
      return response.json({ message: 'Valid token' })
    } catch {
      return response.status(401).send({ message: 'Invalid token' })
    }
  }
}
