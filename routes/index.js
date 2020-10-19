const routes = require('express').Router();
const cliente = require('./cliente')

//index
routes.get('/', (req, res) => {res.render('index', {title: 'Inicio | Tecnosalud',})})

// cliente (example)
routes.use('/cliente', cliente)

//404
routes.use(function(req, res, next) {res.status(404).render('notfound', {title: "Pagina no encontrada | Tecnosalud"})});


module.exports = routes;