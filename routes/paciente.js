const routes = require('express').Router();

// paciente/registrar
routes.get('/registrar', (req, res) => {res.render('paciente/registro', {title: 'Registrar Paciente | Tecnosalud', scripts: ["paciente/addPaciente.js"]})})

module.exports = routes;