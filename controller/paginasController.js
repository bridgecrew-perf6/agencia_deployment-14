import { Viaje } from "../models/Viaje.js";
import Testimoniales from "../models/Testimoniales.js";
import express from "express";

const paginaInicio = async(req, res) => { //req es lo que enviamos. res es lo que express nos reponde

    // consultar Viajes y testimoniales  en pagina de inicio, cuidado con no poner dos await distintos. Si se van a ejecutar al mismo tiempo, que sea uno.
    // podrian ponerse en un arreglo para que se vayan ejecutando al mismo tiempo y el primer await no haga demorar al siguiente. 
    const resultadoDb = [];

    resultadoDb.push(Viaje.findAll({ limit: 3 }))
    resultadoDb.push(Testimoniales.findAll({ limit: 3 }))

    try {
        //hacer que se ejecuten las dos consultas al mismo tiempo, usando un solo await en vez de dos :)
        const resultado = await Promise.all(resultadoDb);
        //seria distinto a hacer: 
        // const viajes = await Viajes.findAll();
        // const testimoniales = await Viajes.findAll();

        res.render('inicio', {
            pagina: 'Inicio', // pagina es una variable reutilizable.
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros = (req, res) => { //req es lo que enviamos. res es lo que express nos reponde
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async(req, res) => { //req es lo que enviamos. res es lo que express nos reponde

    const viajes = await Viaje.findAll();
    //console.log(viajes);

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes,
    });
}

const paginaTestimoniales = async(req, res) => { //req es lo que enviamos. res es lo que express nos reponde

    const testimoniales = await Testimoniales.findAll();

    try {
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error)
    }
}


// Muestra el viaje por su slug
const paginaDetalleViaje = async(req, res) => {

    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug } })
        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}