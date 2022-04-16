import express from "express";
import {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
} from '../controller/paginasController.js';

import {
    guardarTestimomial
} from '../controller/testimonialController.js';

const router = express.Router();

router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);

router.get('/viajes/:slug', paginaDetalleViaje);

router.get('/testimoniales', paginaTestimoniales);
// procesar los datos ingresador en testimoniales en el formulario
router.post('/testimoniales', guardarTestimomial);


export default router;

// index.js llama a las paginas, estas siendo una extencion de index.pug todas las variables
// creadas en index.js afectan a todas estas paginas conectadas entre si.