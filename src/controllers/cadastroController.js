const CadastrarLivro = require("../models/cadastroLivroModel")

exports.index = (req, res) => {
    res.render('cadastro')
}

exports.registro = async (req,res) => {
    try{
        const cadastrarlivro = new CadastrarLivro(req.body)
        await cadastrarlivro.registrar()

        if(cadastrarlivro.errors.length > 0){
            req.flash('errors',cadastrarlivro.errors)
            req.session.save(function() {
                res.redirect(req.get('Referer') || '/cadastrar/index')
            })
            return
        }

        req.flash('success','Livro Cadastrado!')
        req.session.save(function () {
            res.redirect(req.get('Referer') || '/cadastrar/index')
        return
        })
    }catch(e) {
        res.render('404')
    }
}

