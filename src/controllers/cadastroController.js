const CadastrarLivro = require("../models/cadastroLivroModel")

exports.index = (req, res) => {
    res.render('cadastro')
}

exports.registro = async (req,res,next) => {
    try{
        const cadastrarlivro = new CadastrarLivro(req.body)
        await cadastrarlivro.registrar()

        if(cadastrarlivro.errors.length > 0){
            req.flash('errors',cadastrarlivro.errors)
            req.session.save(function() {
                res.redirect(req.get('Referer') || '/cadastrar/index')
            })
            return next()
        }

        req.flash('success','Livro Cadastrado!')
        req.session.save(function () {
            res.redirect(req.get('Referer') || '/cadastrar/index')
            return next()
        })
    }catch(e) {
        res.render('404')
    }
}

exports.buscarItem = async (req,res,next) => {
    try{

        const buscandoItem = new CadastrarLivro(req.body)
        const item = await buscandoItem.FindItem()

        //array com todos os dados dos livros
        res.locals.item = item

        next()
    }catch(e){
        res.render('404')
    }
}