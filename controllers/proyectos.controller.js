const Proyectos = require('../models/proyectos.model');
// const slug = require('slug'); // convertir a ruta url lo haremos antes de insertar a la BD
const Tareas = require('../models/tareas.model');

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    // Request es cuando se da enter, se realiza petición al servidor, Response es lo que devuelve
    res.render("index", {
        nombrePagina: 'Proyectos', // + res.locals.year, // acá se pueden pasar esas variables del middleware
        proyectos
    });
}

exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll(); // Toca pasarlo por todos por que el layout se trae esta lista
    res.render("nuevo-proyecto", {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll(); // Toca pasarlo por todos por que el layout se trae esta lista
    // Enviar a la consola lo que el usuario escriba.
    // console.log(req.body);

    // Validar que tengamos algo en el input
    const nombre = req.body.nombre;
    // const { nombre } = req.body;

    let errores = [];

    /* ===================================================
      En las rutas usamos express validator, cambia el valor por post para insertarlo a la BD,
      esta validación sirve para el mensaje de alerta que sale en caso de ser vacío
    ===================================================*/
    if (!nombre) {
        errores.push({ 'texto': 'Agrega un Nombre al proyecto' });
    }

    // Si hay errores
    if (errores.length > 0) {
        res.render('nuevo-proyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        // No hay errores
        // Insertar en la BD
        /* ===================================================
          Con promesas sirve pero es mejor utilizar async/await
        ===================================================*/
        // Proyectos.create({ nombre})
        //     .then(() => console.log('Insertado correctamente'))
        //     .catch(err => console.log(err))
        /* ===================================================
          Se puede modificar la url antes de llamar a create pero
          puede ocurrir que existan dos url iguales, para esto se van 
          a utilizar hooks en el modelo
        ===================================================*/
        // const url = slug(nombre).toLowerCase();
        // const proyecto = await Proyectos.create({nombre, url});
        // Adicional, No necesitamos definirlo en una constante porque luego el valor no lo usamos
        await Proyectos.create({ nombre });
        res.redirect('/');
    }
}

exports.proyectoXUrl = async (req, res, next) => {

    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]); // Se puede hacer así por lo que realmente una no depende de la otra

    // Consultar tareas del proyecto actual
    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        },
        // include: [
        //     {
        //         model: Proyectos
        //     }
        // ] // De esta forma es como si estuvieramos haciendo un JOIN en SQL
    })

    if (!proyecto || !tareas) return next();

    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    })
}

exports.formularioEditar = async (req, res) => {

    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]); // Se puede hacer así por lo que realmente una no depende de la otra

    // Render a la vista
    res.render('nuevo-proyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll(); // Toca pasarlo por todos por que el layout se trae esta lista
    // Enviar a la consola lo que el usuario escriba.
    // console.log(req.body);

    // Validar que tengamos algo en el input
    const nombre = req.body.nombre;
    // const { nombre } = req.body;

    let errores = [];

    /* ===================================================
      En las rutas usamos express validator, cambia el valor por post para insertarlo a la BD,
      esta validación sirve para el mensaje de alerta que sale en caso de ser vacío
    ===================================================*/
    if (!nombre) {
        errores.push({ 'texto': 'Agrega un Nombre al proyecto' });
    }

    // Si hay errores
    if (errores.length > 0) {
        res.render('nuevo-proyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        // No hay errores
        // Insertar en la BD
        /* ===================================================
          Con promesas sirve pero es mejor utilizar async/await
        ===================================================*/
        // Proyectos.create({ nombre})
        //     .then(() => console.log('Insertado correctamente'))
        //     .catch(err => console.log(err))
        /* ===================================================
          Se puede modificar la url antes de llamar a create pero
          puede ocurrir que existan dos url iguales, para esto se van 
          a utilizar hooks en el modelo
        ===================================================*/
        // const url = slug(nombre).toLowerCase();
        // const proyecto = await Proyectos.create({nombre, url});
        // Adicional, No necesitamos definirlo en una constante porque luego el valor no lo usamos
        await Proyectos.update(
            { nombre: nombre },
            { where: { id: req.params.id } });
        res.redirect('/');
    }
}

exports.eliminarProyecto = async (req, res, next) => {
    // req, query o params
    // console.log(req.query); // url
    // console.log(req.params); // urlProyecto
    const { urlProyecto } = req.query;

    const resultado = await Proyectos.destroy({
        where: {
            url: urlProyecto
        }
    });

    // Si se llega a caer la conexión
    if (!resultado) {
        return next();
    }

    res.status(200).send('Proyecto eliminado correctamente')
}