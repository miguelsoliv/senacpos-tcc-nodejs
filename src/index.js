const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes')

const app = express()

mongoose.connect('mongodb+srv://senacpos-tcc:senacpos-tcc@cluster0-qbsht.mongodb.net/tcc-pos?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

app.use(express.json())
app.use(routes)

app.listen(3333)
