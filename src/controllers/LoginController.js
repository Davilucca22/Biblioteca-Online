const { render } = require('ejs')
const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    if(req.session.user){
        return res.render('login-logado')
    }
    res.render('Login')
}

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body)
        await login.register()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function () {
                return res.redirect(req.get('Referer') || '/login')
            })
            return
        }

        req.flash('success','Seu usuario foi criado com sucesso')
            req.session.save(function () {
                return res.redirect(req.get('Referer') || '/login')
            })

    } catch (e) {
        console.log(e)
    }
}

exports.LogIn = async (req, res) => {
    try {
        const login = new Login(req.body)
        await login.logar()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function () {
                return res.redirect(req.get('Referer') || '/login')
            })
            return
        }

        req.flash('success','Usuario logado')
        req.session.user = login.user
        req.session.save(function () {
            return res.redirect('/')
        })


    } catch (e) {
        console.log(e)
    }

}

exports.logout = (req,res) => {
    req.session.destroy()
    res.redirect('/')
}