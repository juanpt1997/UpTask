const Sequelize = require('sequelize');

const db = require('../config/db');

const slug = require('slug');
const nanoid = require('nanoid');

const Proyectos = db.define('proyectos', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre :{
        type: Sequelize.STRING(100)
    },
    url : Sequelize.STRING(200)
}, {
    hooks: {
        beforeCreate(proyecto) {
            const url = slug(proyecto.nombre).toLowerCase();
            proyecto.url = `${url}-${nanoid.nanoid()}`;
        }
        /* No ponemos ningún beforeUpdate porque implicaria cambiar la url del proyecto y cambiar el slug puede ser más traumático debido a que es un link */
    }
})

module.exports = Proyectos;