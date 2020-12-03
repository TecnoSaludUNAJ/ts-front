const routes = require('express').Router();

routes.get('/', (req, res) => res.render('turnos/index', {title: 'Turnos | Tecnosalud', scripts: ["turnos/index.js", "services/turnosService.js"]}))
routes.get('/mis-turnos', (req, res) => res.render('mis-turnos/index', {title: 'Mis Turnos | Tecnosalud', scripts: ["turnos/mis-turnos.js", "services/turnosService.js"]}))
routes.get('/mostrarTurno', (req, res) => res.render('turnos/mostrarTurno', {title: 'Ver turno | Tecnosalud'}))

// turnos/agenda-dia
routes.get('/agenda-dia', (req, res) => res.render('turnos/agendaTurnos', {title: 'Agenda del día | Tecnosalud', scripts: ["turnos/agendaTurnos.js"]}))

module.exports = routes;