const { Router } = require('express')
const ManicureController = require('./controllers/ManicureController')

const routes = Router()

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

routes.get('/manicures', ManicureController.index)
routes.post('/manicures', ManicureController.store)

module.exports = routes
