const routes = require('express').Router();
const usuario = require('./usuario')
const profesional = require('./profesional')
const historia = require('./historiaClinica')

//index
routes.get('/', (req, res) => { res.render('index', { title: 'Inicio | Tecnosalud', }) })

// routes de usuario
routes.use('/usuario', usuario)
routes.use('/profesional', profesional)
routes.use('/historiaClinica', historia)

//404
routes.use(function(req, res, next) { res.status(404).render('notfound', { title: "Pagina no encontrada | Tecnosalud" }) });


module.exports = routes;