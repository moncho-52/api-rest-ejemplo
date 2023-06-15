import express, {urlencoded} from 'express'
import User from './classes/user.class.js';

let servidor = express();

// Middleware de logs de peticiones
servidor.use(function(req, res, next) {
    console.log(`Nueva petición realizada a las ${new Date().toLocaleTimeString()}`)
    next()
})

servidor.use((req,res,next) => {
    let tiene_permisos = true;
    if(tiene_permisos) {
        next();
    }
    else {
        res.status(403).json({
            status: 403,
            message: 'Unauthorized'
        })
    }
})

servidor.use(urlencoded())

// ruta servicio /, método GET
servidor.get('/', (req, res) => {
    res.send(`
    <html>
    <body>
        <h1>404 no encontrado</h1>
    </body>
    </html>
    `)
})

// ruta servicio '/users/all'
servidor.get('/users/all', async(req, res) => {

    let user = new User();
    let datos = await user.list(req.query);

    if(req.query.id != undefined) {
        datos = datos.filter((e) => {
            return e.id == req.query.id
        })
    }

    res.json(datos)
})

// ruta servicio '/user/insert' (POST)
servidor.post('/user/insert', (req, res) => {
    res.json({
        status: 200,
        data: req.body
    })
})

servidor.listen(8080, function() {
    console.log(User)
    console.log('Escuchando en puerto 8080');
})

