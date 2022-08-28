const Tareas = require('../models/tareas.model');
const Proyectos = require('../models/proyectos.model');

exports.nuevaTarea = async (req, res, next) => {
    // Obtener el proyecto actual
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    })

    // Leer el valor del input
    const { tarea } = req.body;

    const estado = 0; // Por defecto incompleto
    const proyectoId = proyecto.id; // id del proyecto para asociar la tarea

    // Insertar
    const resultado = await Tareas.create({
        tarea, estado, proyectoId
    })
    if (!resultado) {
        return next();
    }

    // Redireccionar      
    res.redirect(`/proyectos/${req.params.url}`);

}

exports.cambiarEstadoTarea = async (req, res, next) => {
    // req.query viene vacío entonces utilizamos params
    // console.log(req.params);
    const { id } = req.params;
    const tarea = await Tareas.findOne({ where: { id/* : id */ } }); // Como la llave y el valor se llaman igual no es necesario ponerlo completo

    // Cambiar estado 
    let estado = tarea.estado === 0 ? 1 : 0;
    tarea.estado = estado;

    const resultado = await tarea.save();

    if (!resultado) return next(); // En caso de que algo no salga bien y no queremos que continue

    res.status(200).send("Actualizado");

}

exports.eliminarTarea = async (req, res, next) => {
    // const {idTarea} = req.query; // Acá si funciona el req.query por lo que se pasa el delete con params
    const { id } = req.params;

    const resultado = await Tareas.destroy({ where: { id } });

    if (!resultado) return next(); // En caso de que algo no salga bien y no queremos que continue

    res.status(200).send("Eliminado")
}