const { Router } = require('express')

const {
  AuthController, UserController, CustomerController, ProfessionalController,
  ScheduleController
} = require('./app/controllers')

const authMiddleware = require("./app/middlewares/auth")

const routes = Router()

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

routes.post('/users', UserController.store)

routes.post('/authenticate', AuthController.authenticate)
routes.post('/forgot-password', AuthController.forgotPassword)
routes.post('/validate-token', AuthController.validateToken)

routes.use(authMiddleware)
routes.put('/customers/:id', CustomerController.update)
routes.get('/professionals/:id', ProfessionalController.index)
routes.put('/professionals/:id', ProfessionalController.update)
routes.post('/schedule', ScheduleController.store)
routes.get('/schedule/:id_professional', ScheduleController.index)

module.exports = routes
