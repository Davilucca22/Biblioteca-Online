const CadastrarLivro = require("../models/cadastroLivroModel")

exports.index = (req,res,next) => {
    res.render('detalhes')
    next()
}

exports.mostraLivro = async (req,res,next) => {
    try{
        const arryaDeLivros = new CadastrarLivro(req.body)
        const id = req.params.id

        const livro = await arryaDeLivros.FindOneItem(id)

        res.locals.livroClicado = livro
        next()

    }catch(e){
        res.render('404')
    }
    
}

//a rota nao esta sendo reconhecida CANNOT POST
exports.editar = async (req,res,next) => {
    try{
     const Banco = new CadastrarLivro(req.body)
     const id = req.params.id
     const Ndados = req.body

     await Banco.EditItem(id,Ndados)

     if(Banco.errors.length > 0){
            req.flash('errors',Banco.errors)
            req.session.save(function() {
                res.redirect(req.get('Referer') || '/detalhes/editar/:id')
            })
            return next()
        }

        req.flash('success','Livro Editado!')
        req.session.save(function () {
            res.redirect('/')
            return next()
        })

    }catch(e){
        console.log(e)
        res.render('404')
    }
}

exports.deletar = (req,res,next) => {
    try{
        const banco = new CadastrarLivro(req.body)
        id = req.params.id
        banco.DeleteItem(id)

        req.flash('success','Livro Deletado!')
        req.session.save(function () {
            res.redirect('/')
            return next()
        })

    }catch(e){
        res.render('404')
    }
}