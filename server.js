require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')

app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.LOGINADM,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.emit('pronto')
}).catch(e => console.log(e))

const session = require('express-session')
const flash = require('connect-flash')
const mongoStore = require('connect-mongo')

const SessionOptions = session({
    secret:process.env.SECRET,//o secret cria uma assinatura digital para impedir q a sessao seja alterada manualmente
    store:mongoStore.create({mongoUrl:process.env.LOGINADM}),//store faz com q as sessoes sejam guaradadas em um banco de dados externo,nesse projeto uso o mongodb
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7,//tempo maximo da sessao, uma semana
        httpOnly:true
    }
})

app.use(SessionOptions)
app.use(flash())


const meuMiddleware = require("./src/middlewares/middleware")

app.use(meuMiddleware.Global)

const routes = require('./src/routes/route')

app.use(routes)

app.use(express.static('public'))

//define nome e caminho da pasta da view
app.set('views','./src/views')

//define o tipo e a engine usada na apliçao
app.set('view engine', 'ejs')

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('servidor rodando na porta 3000')
        console.log('http://localhost:3000')
    })  
})
