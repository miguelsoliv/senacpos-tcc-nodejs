const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    select: false
  },
  generatedPassword: {
    type: String,
    select: false
  },
  generatedPasswordExpireAt: {
    type: Date,
    select: false
  }
})

UserSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) next()

  this.password = await bcrypt.hash(this.password, 8)
})

UserSchema.pre('findOneAndUpdate', async function hashPassword(next) {
  if (!this._update.password) next()

  this._update.password = await bcrypt.hash(this._update.password, 8)
})

UserSchema.methods = {
  compareHash(hash, compareToPassword = true) {
    return bcrypt.compare(hash, compareToPassword ?
      this.password : this.generatedPassword)
  },

  generateToken() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })
  }
}

module.exports = mongoose.model('User', UserSchema)
