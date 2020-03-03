const { Router } = require('express')

const {
  AuthController, UserController, ManicureController, ScheduleController
} = require('./app/controllers')

const authMiddleware = require("./app/middlewares/auth")

const routes = Router()

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

routes.get('/manicures', ManicureController.index)
routes.post('/manicures', ManicureController.store)

routes.post('/authenticate', AuthController.authenticate)
routes.post('/forgot-password', AuthController.forgotPassword)
routes.post('/validate-token', AuthController.validateToken)

routes.post('/users', UserController.store)
routes.use(authMiddleware)
routes.get('/users/:id', UserController.show)
routes.put('/users/:id', UserController.update)
routes.post('/schedule', ScheduleController.store)
routes.get('/schedule/:id_manicure', ScheduleController.index)

module.exports = routes
