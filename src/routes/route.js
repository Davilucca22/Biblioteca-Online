const express = require('express')
const route = express.Router()

const home = require('../controllers/homeController')
const login = require('../controllers/LoginController')
const cadastro = require('../controllers/cadastroController')
const detalhes  = require('../controllers/detalhesController')
const busca  = require('../controllers/buscaController')

const { LoginRequired, ImgConvert  } = require('../middlewares/middleware')

//rotas de home
route.get('/',cadastro.buscarItem,home.index)

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

//rota de detalhes dos livros
route.get('/detalhes/:id',LoginRequired,detalhes.mostraLivro,detalhes.index)

//rota de editar livro
route.post('/detalhes/editar/:id',upload.single('capa'),ImgConvert,detalhes.editar)

//rota de deletar
route.get('/detalhes/deletar/:id',detalhes.deletar)

route.post('/busca',busca.buscaItem)

module.exports = route  
