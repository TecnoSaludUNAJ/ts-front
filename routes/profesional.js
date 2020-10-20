const routes = require('express').Router();

//index
routes.get('/', (req, res) => {res.render('index', {title: 'Dashboard de Profesional | Tecnosalud'})})

//profesional
routes.get('/', (req, res) => {res.render('profesional/postprofesional', {title: 'Registrar Profesional | Tecnosalud', scripts: ["profesional/post.js"]})})

module.exports = routes;