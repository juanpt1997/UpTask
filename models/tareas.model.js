const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./proyectos.model');

const Tareas = db.define('tareas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tarea: Sequelize.STRING(100),
    estado: Sequelize.INTEGER(1)
}/* ,
    {
        timestamps: true
    } */
);
Tareas.belongsTo(Proyectos);
// Proyectos.hasMany(Tareas) //Es parecido pero significa que un proyecto tiene multiples tareas, debería ir en el otro modelo

// const Sincronizar = async () => {
//     await db.sync({ force: true });
//     console.log("All models were synchronized successfully.");
// }
// Sincronizar();  // Esto me lo inventé leyendo la documentación para encontrar como sincronizar la BD

module.exports = Tareas;