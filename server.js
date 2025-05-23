require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')

app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.LOGINADM,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.emit('pronto')
}).catch(e => console.log(e))

const routes = require('./src/routes/route')

app.use(routes)

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
