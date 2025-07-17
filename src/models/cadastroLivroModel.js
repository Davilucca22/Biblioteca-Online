const mongoose = require('mongoose')


const CadastroLivro = new mongoose.Schema({
    titulo:{type: String, required: true},
    autor:{type: String, required: true},
    genero:{type: String, required: true},
    capa:{type: String,required: true}
})

const CadastroModel = mongoose.model('cadastro', CadastroLivro)

class CadastrarLivro{
    constructor(body){
        this.body = body,
        this.errors = [],
        this.livroCadastrado = null
    }

    async registrar() {
        this.valida()
        if(this.errors.length > 0) return
        try{
            this.livroCadastrado = await CadastroModel.create(this.body) 
        }catch(e){
            console.log('Erro ao salvar no banco de dados')
            console.log(e)
        }
    }

    //busca todos os itens no banco de dados
    async allItems() {
        return await CadastroModel.find()
    }

    //busca apenas o livro com o id correspondente
    async FindOneItem(id) {
        return await CadastroModel.findOne({_id:id})
    }

    //edita os dados do livro com id passado
    async EditItem(id,NovosDados) {
        return await CadastroModel.updateOne({_id:id},{ $set: NovosDados})
    }

    //deleta livros do banco
    async DeleteItem(id){
        return await CadastroModel.findByIdAndDelete({_id:id})
    }

    valida(){
        this.CleanUp()
        
        if(!this.body.capa) this.errors.push('Insira uma capa para o livro!')
        if(!this.body.titulo) this.errors.push('Insira um titulo para o livro!')
        if(!this.body.autor) this.errors.push('Insira um autor para o livro!')
        if(!this.body.genero) this.errors.push('Insira um genero para o livro!')
    }

    CleanUp(){
        for(let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }    

        this.body = {
            titulo: this.body.titulo,
            autor: this.body.autor,
            genero: this.body.genero,
            capa: this.body.capa
        }
    }
}

module.exports = CadastrarLivro