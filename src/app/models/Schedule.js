const mongoose = require('mongoose')

const ScheduleSchema = new mongoose.Schema({
  id_professional: mongoose.Schema.Types.ObjectId,
  id_user: mongoose.Schema.Types.ObjectId,
  username: String,
  marked_date: Date,
  total: Number,
  description: String
})

module.exports = mongoose.model('Schedule', ScheduleSchema)
