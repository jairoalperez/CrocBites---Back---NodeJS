const express= require('express')
const router = express.Router()
const usuario = require('../controllers/usuario')
const post= require('../controllers/post')
//const puntaje=require('../controllers/puntaje')
//const passport=require('passport')
const  {passportAuth}  = require('../middlewares')

//registro y login
router.post('/registro',usuario.register)
router.post('/login', passportAuth)
router.get('/perfil',(req,res)=>{
    res.send('perfil')
})

//Manejo de Archivos
const multer = require('multer')
const { uploadImage } = require('../controllers/uploadImage')

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb('invalid image file', false)
    }
}
const uploads = multer({ storage, fileFilter })

router.post('/upload', uploads.single('bite'), uploadImage)

//rutas de usuario
router.get('/buscar-usuario/:id_usuario',usuario.buscarid)
router.put('/editar-usuario',)

//rutas post
router.get('/crear-post',post.crear)
router.get('/leer-post',post.leerpost)
router.get('/buscar-post',post.buscarpost)
router.delete('/borrar-post',post.borrarpost)
router.put('/editar-post',)


module.exports = router