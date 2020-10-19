# ts-front





## Guia rápida 🚀

Usamos handlebars: https://handlebarsjs.com/  para template de plantillas, pero desde el lado servidor, con [hbs](https://www.npmjs.com/package/hbs).

### Instalacion

```
git clone https://github.com/TecnoSaludUNAJ/ts-front.git
cd ts-front
npm install
```


------

#### Agregar pagina

Crear un archivo .hbs en /views con la siguiente estructura

```js
// ejemplo.hbs
{{> head}}
{{! --------------- }}
<div class="container">
    Index
</div>
{{! --------------- }}
{{> footer}}
```

Modificar a gusto el HTML dentro de container.



*Nota: se podría crear /views/funcionalidad y todos los archivos .hbs relacionados, luego en .render() pasarlo como 'funcionalidad/funcion'*



------


#### Agregar ruta/s:

en routes/index.js, antes de 404. En res.render() se escribe el nombre del archivo .hbs ubicado en /views, y el titulo

```javascript
// ejemplo una sola pagina
routes.get('/ejemplo', (req, res) => {res.render('ejemplo', {title: 'Ejemplo | Tecnosalud'})})

// 404
...
```

**OPCIONAL: También se puede agregarle scripts de js (deben estar en public/js). Pasarlo como array ** Ya que el template si encuentra scripts, los agrega automaticamente (ver views/footer.hbs)
```javascript
// ejemplo con scripts de js
routes.get('/ejemplo', (req, res) => {res.render('ejemplo', {title: 'Ejemplo | Tecnosalud', scripts: ['ejemplo.js']})})

// 404
...
```

O bien, se puede crear un archivo que contenga todas las rutas relacionadas a una funcionalidad.

###### Ejemplo con funcionalidad "cliente"
routes/cliente.js

```js
const routes = require('express').Router();
//index
routes.get('/', (req, res) => {res.render('cliente-home', {title: 'Dashboard cliente | Tecnosalud'})})
//reservas
routes.get('/reservas', (req, res) => {res.render('cliente-reservas', {title: 'Reservas | Tecnosalud'})})
routes.get('/reservas/detalle', (req, res) => {res.render('index', {title: 'Reservas | Tecnosalud'})})

routes.get('/resumen', (req, res) => {res.render('cliente-resumen', {title: 'Resumen de cliente | Tecnosalud'})})

module.exports = routes;
```

Luego en **routes/index.js** importar el archivo y agregarlo

```javascript
const cliente = require('./cliente')

..
..
// cliente (example)
routes.use('/cliente', cliente)
// 404
```

