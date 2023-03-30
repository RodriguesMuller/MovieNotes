require("express-async-errors")
const migrationsRun = require('./database/sqlite/migrations')
const AppError = require('./utils/AppError')

//1º importando o framework Express
const express = require("express");

const routes = require("./routes");
migrationsRun();

const { response } = require("express");

//2º iniciando express
const app = express();
//padrao que iremos utilizar é o  json
app.use(express.json())

app.use(routes)



//verificando se o error é do servidor e devolvendo um tipo de erro
app.use(( error, req, resp, next ) =>{
    if(error instanceof AppError) {
        return resp.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)

    return resp.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

//3º definindo a porta para atender as requisições
const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));


