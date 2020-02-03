const mongoose = require('mongoose')

const ManicureSchema = new mongoose.Schema({
  name: String,
  photo_url: String,
  services: {
    name: String,
    price: Number
  },
  schedule: {
    days: [String],
    hours: [String]
  }
})

module.exports = mongoose.model('Manicure', ManicureSchema)
