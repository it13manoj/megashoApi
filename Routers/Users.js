const express = require('express')
const Route = express.Router()
const userController = require('../Controllers/Users')

Route.get('/1110010',userController.index);
Route.post('/login',userController.login)
Route.post('/register',userController.create);

module.exports = Route