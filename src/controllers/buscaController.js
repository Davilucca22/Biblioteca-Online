const Model  = require('../models/cadastroLivroModel')

exports.index = (req,res,next) => {
    res.render('buscaLivros')
    next()
}  

exports.BuscaNoBanco = async (req,res,next) => {
    const livros = new Model(req.body)
    const tituloBusca = livros.body.busca

    const array = await livros.allItems()

    const resultado = []

    array.forEach(el => {
        if(el.titulo.includes(tituloBusca) || el.autor.includes(tituloBusca) || el.genero.includes(tituloBusca)){
            resultado.push(el)
        } 
    })

    res.locals.findResult = resultado
    
        next()
    }
