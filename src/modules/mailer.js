const nodemailer = require('nodemailer')

const user = process.env.EMAIL_USER
const pass = process.env.EMAIL_PASSWORD

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass }
})

module.exports = transporter
