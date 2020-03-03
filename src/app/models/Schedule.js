const mongoose = require('mongoose')

const ScheduleSchema = new mongoose.Schema({
  id_manicure: mongoose.Schema.Types.ObjectId,
  id_user: mongoose.Schema.Types.ObjectId,
  marked_date: Date,
  total: Number,
  description: String
})

module.exports = mongoose.model('Schedule', ScheduleSchema)
