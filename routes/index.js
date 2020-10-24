const routes = require('express').Router();
const usuario = require('./usuario')
const profesional = require('./profesional')
const turnos = require('./turnos')
const especialidad = require('./especialidad')
const especialista = require('./especialista');
const { route } = require('./especialista');

//index
routes.get('/', (req, res) => {res.render('index', {title: 'Inicio | Tecnosalud',})})

// routes de usuario
routes.use('/usuario', usuario)
routes.use('/profesional', profesional)
routes.use('/turnos', turnos);
routes.use('/especialidad', especialidad);
routes.use('/especialista',especialista);

//404
routes.use(function(req, res, next) {res.status(404).render('notfound', {title: "Pagina no encontrada | Tecnosalud"})});


module.exports = routes;