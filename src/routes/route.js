const express = require('express')

const route = express.Router()

const home = require('../controllers/homeController')
const login = require('../controllers/LoginController')

route.get('/',home.index)

route.get('/login',login.index)

route.post('/login/register',login.register)
route.post('/login/login',login.LogIn)
route.get('/login/logout',login.logout)



module.exports = route  
