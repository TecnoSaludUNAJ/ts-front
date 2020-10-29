const routes = require('express').Router();
const usuario = require('./usuario')
const profesional = require('./profesional')
const historia = require('./historiaClinica')
const turnos = require('./turnos')
const especialidad = require('./especialidad')
const especialista = require('./especialista');
const { route } = require('./especialista');
const paciente = require('./paciente');

//index
routes.get('/', (req, res) => { res.render('index', { title: 'Inicio | Tecnosalud', }) })

// routes de usuario
routes.use('/usuario', usuario)
routes.use('/profesional', profesional)
routes.use('/historiaClinica', historia)
routes.use('/turnos', turnos);
routes.use('/especialidad', especialidad);
routes.use('/especialista',especialista);
routes.use('/paciente',paciente);


//404
routes.use(function(req, res, next) { res.status(404).render('notfound', { title: "Pagina no encontrada | Tecnosalud" }) });


module.exports = routes;
