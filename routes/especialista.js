const routes = require('express').Router();


//especialista/registrar
routes.get('/registrar', (req, res) => {res.render('especialista/registrar', {title: 'Registrar Especialista | Tecnosalud', scripts: ["especialista/post.js"]})})


module.exports = routes;