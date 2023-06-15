import express, {urlencoded} from 'express'
import User from './classes/user.class.js';

let servidor = express();

// Middleware de logs de peticiones
servidor.use(function(req, res, next) {
    console.log(`Nueva petición realizada a las ${new Date().toLocaleTimeString()}`)
    next()
})

// Middleware ejemplo validación de permisos
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

// Middleware para obtener datos por POST
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
    try {
        let user = new User();
        let datos = await user.list(req.query);

        if (req.query.id != undefined) {
            datos = datos.filter((e) => {
                return e.id == req.query.id
            })
        }
        res.json(datos)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: 500,
            data: 'Se produjo un error a nivel de servidor'
        })
    }
    
})

// ruta servicio '/user/insert' (POST)
servidor.post('/user/insert', async(req, res) => {
    try {
        if (req.body.name != undefined && req.body.age != undefined) {
            let user = new User();
            res.json({
                status: 200,
                data: await user.insert(req.body)
            })
        }
        else {
            res.status(400).json({
                status: 400,
                data: 'Petición inválida'
            })
        }   
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: 500,
            data: 'Se produjo un error a nivel de servidor'
        })
    }
    
})

servidor.listen(8080, function() {
    console.log(User)
    console.log('Escuchando en puerto 8080');
})

