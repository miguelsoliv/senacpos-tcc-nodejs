const mongoose = require('mongoose')

const ManicureSchema = new mongoose.Schema({
  name: String,
  photo_url: String,
  services: {
    names: [String],
    prices: [Number]
  },
  schedule: {
    days: [String],
    hours: [[String]]
  }
})

module.exports = mongoose.model('Manicure', ManicureSchema)
