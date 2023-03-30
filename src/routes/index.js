const { Router } = require("express")

const usersRouter = require("./users.routes")
const notesRouter = require("./notes.routes")

const routes = Router()
//quando acessar o users, sera direcionado para o userRouter (grupo de rota do usuario)
routes.use("/users", usersRouter)
routes.use("/notes", notesRouter)

module.exports = routes;