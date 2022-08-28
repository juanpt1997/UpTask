//import express from 'express'; // Express no soporta esta sintaxis
const express = require('express');
const routes = require('./routes');
const path = require('path'); // Libreria existente en node, lee los archivos que existen en las carpetas
const bodyParser = require('body-parser');

// helpers con algunas funciones
const helpers = require('./helpers');

// Crear la conexión a la BD
const db = require('./config/db');

// Importar los modelos
require('./models/proyectos.model');
require('./models/tareas.model');

//db.authenticate()
db.sync()
    .then(() => console.log("Conectado al servidor"))
    .catch(err => console.log(err));

// Crear una app de express
const app = express();

// Donde cargar los archivos estáticos
app.use(express.static('public'));

// Habilitar Pug
app.set('view engine', 'pug');

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Esto es un middleware, todo se va ejecutando en orden, si no se coloca el next pues no continua al siguiente middleware
// El middleware brinda servicios y funciones comunes a las aplicación
// Pasar funciones a la aplicación
app.use((req, res, next) => {
    //    res.locals = helpers; // así sirve siempre y cuando luego se llame locals.vardump desde las vistas
    // res.locals.year = 2022; // Las variables se pueden pasar en middleware separados
    res.locals.vardump = helpers.vardump;
    next();
});
// Otro ejemplo de middleware
// app.use((req, res, next) => {
//     const fecha = new Date();
//     res.locals.year = fecha.getFullYear(); // Las variables se pueden pasar en middleware separados
//     next();
// });

// Habilitar body parser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes());

app.listen(7000);