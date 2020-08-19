const express = require('express');
const app = express();

//tablas
app.use(require('./usuario'));
app.use(require('./categoria'));
app.use(require('./producto'));
//login
app.use(require('./login'));


module.exports = app;