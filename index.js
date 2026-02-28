import express from 'express';

const host = '0.0.0.0';
const porta = 3000;

const app = express();
var listaClientes = [];
app.use(express.urlencoded({extended:true}))


//diferente do metodo get que exigia  do usuario a passagem de parametros por meio do usuario
//nessa aula iremos usar o metodo POST
//o  metodo POST cria um novo recurso no servidor (um registro, uma imagem, um comentario , etc)


app.get("/form",(requisicao, resposta)=>{
    resposta.write(`
<!doctype html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
  </head>
  <body>
  <h1 txt-center>CADASTRE-SE PARA AS MELHORES OFERTAS</h1>
<form  method = "POST" action ="/admin"  "row g-3 mt-5" bg-light text-dark>
<div class="row" >
  <div class="col">
    <input type="text" class="form-control" placeholder="Primeiro nome" aria-label="Primeiro nome"  id = "nome" name ="nome">
  </div>
  <div class="col">
    <input type="text" class="form-control" placeholder="Sobrenome" aria-label="Sobrenome"  id = "sobrenome" name ="sobrenome">
  </div>
</div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
   <input type="email" name="email" id="email">
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Senha</label>
    <input type="password" class="form-control" id="senha" name ="Senha">
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Endereço</label>
    <input type="text" class="form-control" id="endereço" name ="endereço" placeholder="Rua 123">
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label">Cidade</label>
    <input type="text" class="form-control" id="cidade" name ="cidade">
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">UF</label>
    <select id="inputState" class="form-select" name ="uf" id = "uf">
      <option selected>Estado</option>
      <option>AC</option>
      <option>MT</option>
      <option>SP</option>
      <option>GO</option>
      <option>DF</option>
    </select>
  </div>
  <div class="col-md-2">
    <label for="inputZip" class="form-label">CEP</label>
    <input type="text" class="form-control" id="CEP" name ="cep">
  </div>

  <div class="col-12">
    <button type="submit" class="btn btn-primary">Salvar</button id ="salvar" name = "salvar">
  </div>
</form>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
  </body>
 
</html>
        
        `)
        resposta.end();

})



//espera por dados de um formulario html
app.post("/admin",(requis,resp)=>{
    //deve adicionar um novo jogador,criando um novo estado da aplicação

    const nome = requis.body.nome;
    const sobrenome = requis.body.sobrenome;
    const email = requis.body.email;
    const cidade = requis.body.cidade;
    const endereço = requis.body.endereço;
    const uf = requis.body.uf;
    const cep = requis.body.cep;
    
    listaClientes.push(
      {
        "nome": nome,
        "sobrenome": sobrenome,
        "email": email,
        "endereço": endereço,
        "cidade":cidade,
        "uf": uf,
        "cep": cep
      }
    )
    resp.redirect("/listaClientes");
})

app.get("/listaClientes",(requis,resp )=> {
 let linhas = "";

    listaClientes.forEach((cliente, index) => {
        linhas += `
        <tr>
            <td>${cliente.nome}</td>
            <td>${cliente.sobrenome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.endereço}</td>
            <td>${cliente.cep}</td>
            <td>${cliente.uf}</td>
            <td>
                <a href="/excluir/${index}">Excluir</a>
            </td>
        </tr>
        `;
    });

    resp.send(`
    <h2>Lista de Clientes Fieis</h2>
    <a href="/form">Novo Cadastro</a>
    <table border="1" cellpadding="5">
        <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
            <th>Endereço</th>
            <th>CEP</th>
            <th>UF</th>
            <th>Ação</th>
        </tr>
        ${linhas}
    </table>
    `);
});

// EXCLUIR
app.get("/excluir/:id", (req, res) => {
    const id = req.params.id;
    listaClientes.splice(id, 1);
    res.redirect("/listaClientes");
});






app.listen(porta,host, ()=>{
    console.log(`Servidor rodando em http:// ${host}:${porta}` );
})