const flash = require('connect-flash')
const express = require('express')
const multer = require('multer')
const fs = require('fs')
const CadastrarLivro = require("../models/cadastroLivroModel")

const app = express()

exports.Global = (req,res,next) => {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user

    next()
}

//se o usuario nao estiver logado, ele nao consegue acessar a pagina de cadastro de livros
exports.LoginRequired = (req,res,next) => {
    if(!req.session.user){
        req.flash('errors','voce precisa estar logado.')
        req.session.save(() => res.redirect('/'))
        return
    }

    next()
}

// Armazenamento temporário em disco
const upload = multer({dest:'uploads/'})

//converte imagens em base64 para salvar no banco de dados como string
exports.ImgConvert = (req,res,next) => {

        if(!req.file){
            return res.status(400).send('Nenhuma imagem enviada')
        }

        const caminho = req.file.path
        const mime = req.file.mimetype

        //converte a imagem em base64
        const dadosBase64 = fs.readFileSync(caminho,{encoding:'base64'})

        // Injeta no body como objeto de imagem
        req.body.capa = `data:${mime};base64,${dadosBase64}`

        // Apaga o arquivo temporário do disco
        fs.unlinkSync(caminho)

        next()
}

