const { Router } = require('express')
const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')
const ManicureController = require('./controllers/ManicureController')
const authMiddleware = require("./middleware/auth")

const routes = Router()

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

routes.get('/manicures', ManicureController.index)
routes.post('/manicures', ManicureController.store)

routes.post('/authenticate', AuthController.authenticate)

routes.post('/users', UserController.store)
routes.use(authMiddleware)
routes.get('/users/:id', UserController.show)

module.exports = routes
