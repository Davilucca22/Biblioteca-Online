### Projeto: Biblioteca Online Simples

#### Objetivo Geral

Criar um sistema básico de gerenciamento de livros utilizando as tecnologias HTML, CSS, JavaScript, Node.js com Express e MongoDB com Mongoose.

---

#### Funcionalidades do Sistema

1. Cadastro de livros com título, autor, gênero e status (Disponível ou Emprestado).
2. Listagem de todos os livros cadastrados.
3. Edição de informações dos livros.
4. Exclusão de livros do sistema.
5. Pesquisa de livros por título.

---

#### Algoritmo de Funcionamento

1. **Inicialização do Servidor**

   * Iniciar o servidor Express.
   * Conectar ao banco de dados MongoDB.
   * Configurar middlewares para servir arquivos estáticos e processar formulários.
   * Definir a view engine (opcional, ex: EJS).

2. **Cadastro de Livro (POST /livros)**

   * Receber os dados do formulário de cadastro.
   * Criar um novo objeto Livro com os dados recebidos.
   * Salvar o objeto no banco de dados.
   * Redirecionar para a listagem de livros.

3. **Listagem de Livros (GET /livros)**

   * Buscar todos os livros no banco de dados.
   * Exibir os livros na tela por meio de uma view ou API JSON.

4. **Edição de Livro (PUT /livros/\:id)**

   * Receber os dados atualizados do formulário de edição.
   * Buscar o livro pelo ID no banco de dados.
   * Atualizar os dados e salvar.
   * Redirecionar para a listagem de livros.

5. **Exclusão de Livro (DELETE /livros/\:id)**

   * Receber o ID do livro a ser excluído.
   * Remover o livro correspondente do banco de dados.
   * Atualizar a interface para refletir a exclusão.

6. **Pesquisa por Título (GET /livros?titulo=...)**

   * Receber o parâmetro de busca via query string.
   * Buscar livros que contenham o título informado.
   * Exibir os resultados da busca.

---

#### Considerações Finais

* O projeto deve ser modularizado com separação entre rotas, modelos e views.
* O uso de Mongoose permite trabalhar com MongoDB de forma mais estruturada.
* O projeto pode ser expandido futuramente com autenticação de usuários, sistema de empréstimos e histórico de transações.

