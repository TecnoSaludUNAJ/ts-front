/*
EJEMPLO. Usarlo como archivo base
*/

const routes = require('express').Router();
//index
routes.get('/', (req, res) => {res.render('index', {title: 'Dashboard | Tecnosalud'})})
//reservas
routes.get('/reservas', (req, res) => {res.render('index', {title: 'Reservas | Tecnosalud'})})

module.exports = routes;