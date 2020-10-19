const routes = require('express').Router();
const usuario = require('./usuario')

//index
routes.get('/', (req, res) => {res.render('index', {title: 'Inicio | Tecnosalud',})})

routes.get('/paciente', (req, res) => {res.render('pacientes/index-paciente', {title: 'Paciente | Tecnosalud', scripts: ["pacientes.js"]})})

// routes de usuario
routes.use('/usuario', usuario)

//404
routes.use(function(req, res, next) {res.status(404).render('notfound', {title: "Pagina no encontrada | Tecnosalud"})});


module.exports = routes;