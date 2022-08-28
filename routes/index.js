const express = require('express');
const router = express.Router();

// Importar express validator
const { body } = require('express-validator'); // Asi revisa el body (req.body)
// En el video aparece en el index?????

// Importar el controlador
const proyectosController = require('../controllers/proyectos.controller')
const tareasController = require('../controllers/tareas.controller')

module.exports = function () {
    // ruta para el home
    router.get('/', proyectosController.proyectosHome);
    /* ===================================================
        - Se requieren los dos métodos get y post para identificar que acción realizar
        - Para post podemos utilizar express validator y validar los campos del formulario
    ===================================================*/
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(), // no vacío, sin espacio al principio y al final, reemplaza caracteres que pueden ser maliciosos en la base de datos
        proyectosController.nuevoProyecto);

    // Listar proyecto
    router.get('/proyectos/:url', proyectosController.proyectoXUrl);

    // Actualizar el proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(), // no vacío, sin espacio al principio y al final, reemplaza caracteres que pueden ser maliciosos en la base de datos
        proyectosController.actualizarProyecto);

    // Eliminar proyecto
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

    // Tareas
    router.post('/proyectos/:url', tareasController.nuevaTarea);

    // Actualizar tarea --patch solo modifica un campo
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

    // Eliminar tarea
    router.delete('/tareas/:id', tareasController.eliminarTarea);
    
    return router;
}
