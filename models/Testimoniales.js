import Sequelize from "sequelize";
import db from "../config/db.js";

// EN MODEL - VIEW - CONTROLER esto es el model. Donde se definen los datos de mi base de datos 
// utilizando sequelize. 

const Testimoniales = db.define('testimoniales', {
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    },

});

export default Testimoniales;