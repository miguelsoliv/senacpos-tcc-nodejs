const mongoose = require('mongoose')

const ScheduleSchema = new mongoose.Schema({
  id_professional: mongoose.Schema.Types.ObjectId,
  id_client: mongoose.Schema.Types.ObjectId,
  marked_date: Date,
  total: Number,
  description: String
})

module.exports = mongoose.model('Schedule', ScheduleSchema)
