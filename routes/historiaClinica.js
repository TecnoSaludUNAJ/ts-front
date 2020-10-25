const routes = require('express').Router();

//index
//routes.get('/', (req, res) => { res.render('index', { title: 'Dashboard de Usuario | Tecnosalud' }) })

//historia-clinica/historia
routes.get('/historia', (req, res) => { res.render('historia-clinica/historia', { title: 'Historia Clinica | Tecnosalud' }) })

module.exports = routes;