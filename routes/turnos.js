const routes = require('express').Router();

routes.get('/', (req, res) => res.render('turnos/index', {title: 'Turnos | Tecnosalud', scripts: ["turnos/index.js", "services/turnosService.js"]}))

module.exports = routes;