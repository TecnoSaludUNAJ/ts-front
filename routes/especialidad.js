const routes = require('express').Router();


//especialidad/registrar
routes.get('/registrar', (req, res) => {res.render('especialidad/registrar', {title: 'Registrar Especialidad | Tecnosalud', scripts: ["especialidad/post.js"]})})

module.exports = routes;