const { Router } = require("express")

const UsersController = require('../controllers/UsersController')

const usersRoutes = Router();

// com o middleware é possivel acessar a requisição, resposta e para chamar o destino
function myMiddleware(req, resp, next) {
  console.log('Você passou pelo Middleware')
  
  //se o usuario não for admin retorna uma mensagem
  if(!req.body.isAdmin) {
    return resp.json({ message: "user unauthorized" })
  }

  //next chama a próxima função a ser executada na pilha
  next();
}

const usersController = new UsersController();

usersRoutes.post("/", myMiddleware, usersController.create);
usersRoutes.put('/:id', usersController.update)

module.exports = usersRoutes;
//exportando arquivo para utilização