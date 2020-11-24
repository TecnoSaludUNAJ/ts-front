const routes = require('express').Router();

//index
routes.get('/', (req, res) => { res.render('historia-clinica/pacientes', { title: 'Lista de pacientes | Tecnosalud', scripts: ["historiaclinica/registros.js"]})})

//historia-clinica/historia
routes.get('/historia', (req, res) => { res.render('historia-clinica/historia', { title: 'Historia Clinica | Tecnosalud', scripts: ["historiaclinica/registros.js"]})})

//historia-clinica/registro
routes.get('/registrar', (req,res) => {res.render('historia-clinica/registrar', {title:'Registrar datos | Tecnosalud', scripts: ["historiaclinica/registros.js"]})})

module.exports = routes; 