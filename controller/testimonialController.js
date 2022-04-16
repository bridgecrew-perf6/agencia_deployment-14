import { Testimoniales } from "../models/Testimoniales.js";

const guardarTestimomial = async(req, res) => {
    //console.log(req.body.nombre)

    // Validar los datos del formulario (que no esten vacios por ejemplo....)
    const { nombre, correo, mensaje } = req.body;
    //insertamos los errores en un arreglo...
    const errores = [];

    if (nombre.trim() === '') {
        errores.push({ mensaje: 'el nombre esta vacio' })
    }
    if (correo.trim() === '') {
        errores.push({ mensaje: 'el correo esta vacio' })
    }
    if (mensaje.trim() === '') {
        errores.push({ mensaje: 'el mensaje esta vacio' })
    }

    //la funcion trim() elimina los espacio en blanco de ambos extremos del string
    //si hay almenos un error: mostrarlos en la vista:
    if (errores.length > 0) {
        //consultar testimoniales existentes
        const testimoniales = await Testimoniales.findAll();

        //mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    } else {
        //almacenar datos en la db
        try {
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');

        } catch (error) {
            console.log(error)
        }
    }

}

export {
    guardarTestimomial
}