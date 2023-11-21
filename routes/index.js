



const express = require('express')

const _ = require('../controllers')
const app = express.Router()

//Routes
app.get('/api/teste',_.teste)

module.exports = app