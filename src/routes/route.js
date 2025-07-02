const express = require('express')
const route = express.Router()

const home = require('../controllers/homeController')
const login = require('../controllers/LoginController')
const cadastro = require('../controllers/cadastroController')

const { LoginRequired, ImgConvert  } = require('../middlewares/middleware')

//rotas de home
route.get('/',home.index)

//rotas de login
route.get('/login',login.index)
route.post('/login/register',login.register)
route.post('/login/login',login.LogIn)
route.get('/login/logout',login.logout)

const multer = require('multer')
const upload = multer({dest:'uploads/'})

//rotas de cadastrar livros
route.get('/cadastrar/index',LoginRequired ,cadastro.index)
route.post('/cadastrar/register',upload.single('capa'),ImgConvert,cadastro.registro)

module.exports = route  
    