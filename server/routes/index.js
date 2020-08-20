const express = require('express');
const app = express();

//tablas
app.use(require('./usuario'));
app.use(require('./categoria'));
app.use(require('./producto'));
app.use(require('./imagenes'));

//ficheros
app.use(require('./upload'));

//login
app.use(require('./login'));


module.exports = app;