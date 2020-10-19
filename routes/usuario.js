const routes = require('express').Router();
// /usuario
routes.get('/', (req, res) => {res.render('index', {title: 'Dashboard de Usuario | Tecnosalud'})})
// usuario/login
routes.get('/login', (req, res) => {res.render('usuario/login', {title: 'Acceso de Usuario | Tecnosalud', scripts: ["usuario/login.js"]})})
// /usuario/logout
routes.get('/logout', (req, res) => {res.render('usuario/logout', {title: 'Acceso de Usuario | Tecnosalud'})})
// /usuario/registro
routes.get('/registro', (req, res) => {res.render('usuario/registro', {title: 'Registrarse | Tecnosalud', scripts: ["usuario/registrar.js"]})})

module.exports = routes;