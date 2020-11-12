const routes = require('express').Router();

// obrassociales/...
routes.get('/alta', (req, res) => {res.render('obras-sociales/registroObraSocial', {title: 'Alta de Obra Social | Tecnosalud', scripts: ["paciente/addPaciente.js"]})})
routes.get('/', (req, res) => {res.render('obras-sociales/listadoObraSocial', {title: 'Obras sociales | Tecnosalud', scripts: ["obrassociales/listarObras.js"]})})

module.exports = routes;