import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import configs from './config';
import routes from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({ path: "variables.env" });



// conectar la base de datos
db.authenticate()
    .then(() => console.log('base de datos conectada'))
    .catch(() => console.log('error'))

//configurar express:
const app = express();
// habilitar PUG:
app.set('view engine', 'pug');
// Añadir las vistas
app.set('views', path.join(_dirname, './views'));

// Definir la carpeta publica (donde se guarda el css e imagenes)
app.use(express.static('public'));

//validar si estamos en desarrollo o en produccion 
const config = configs[app.get('env')];

//creamos la variable para este sitio web
app.locals.titulo = config.nombresitio

// obtener año actual 
app.use((req, res, next) => {

    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.ruta = req.path;
    return next();
})

// Agregar body parser para leer los datos del formulario testimoniales
app.use(bodyParser.urlencoded({ extended: true }));

// Agregar Router
app.use('/', routes());

// **Puerto y host para la app**//
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando')
})