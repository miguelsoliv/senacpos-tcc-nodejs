const nodemailer = require('nodemailer')

const { service, user, pass } = require('../config/mail')

const transporter = nodemailer.createTransport({
  service: service,
  auth: { user, pass }
})

module.exports = transporter
