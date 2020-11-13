const routes = require('express').Router();

// paciente/registrar
routes.get('/registrar', (req, res) => {res.render('paciente/registro', {title: 'Registrar Paciente | Tecnosalud', scripts: ["paciente/addPaciente.js"]})})
routes.get('/listapacientes', (req, res) => {res.render('paciente/listapacientes', {title: 'Lista de pacientes | Tecnosalud', scripts: ["paciente/listarPacientes.js"]})})

module.exports = routes;