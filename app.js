const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')

// use hbs
hbs.registerPartials(__dirname + '/views/partials', function (err) {})
app.set('view engine', 'hbs')
// public
app.use( express.static(__dirname + '/public'))
// routes
app.use('/', routes)

// run
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})