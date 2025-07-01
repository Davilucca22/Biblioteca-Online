const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    email:{type: String, required: true},
    password:{type: String, required: true}
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }

    async logar(){
        this.valida()
        if(this.errors.length > 0) return

        this.user = await LoginModel.findOne({email: this.body.email})

        if(!this.user) {
            this.errors.push('Usuario nao existe!')
            return
        }
        if(!bcryptjs.compare(this.body.password,this.user.password)){
            this.errors.push('Senha invalida!')
            this.user = null
            return
        }

    }

    async register(){
        this.valida()
        if(this.errors.length > 0) return
        
        //essa funçao retorna uma promisse, por isso o await
        await this.usuarioExiste()
        if(this.errors.length > 0) return

        //senha criptografada
        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)    

        //cria o usuario
        this.user = await LoginModel.create(this.body)

    }

    //verifica se o usuario existe
    async usuarioExiste(){
        this.user = await LoginModel.findOne({email: this.body.email})
        if(this.user) this.errors.push('Usuario ja existe!')
    }

    //valida a senha e o email
    valida(){
        this.CleanUp()

        if(!validator.isEmail(this.body.email)) this.errors.push('Email invalido!')
        if(this.body.password.length < 5 || this.body.password.length > 10) this.errors.push('Senha deve conter entre 5 e 10 caracteres!')
    }

    //limpa o body caso o tipo dos dados seja diferente de string
    CleanUp(){
        for(let key in this.body){
            if(typeof this.body[key] != 'string'){
                this.body[key] = ''
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login
