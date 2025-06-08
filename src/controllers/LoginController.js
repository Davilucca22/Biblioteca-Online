const { render } = require('ejs')
const Login = require('../models/livroModel')

exports.index = (req, res) => {
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

exports.login = (req, res) => {
    res.send(req.body)
}