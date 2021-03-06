require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes')

const app = express()

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

app.use(express.json({ limit: '16mb' }))
app.use(routes)

app.listen(process.env.PORT || 3333)
