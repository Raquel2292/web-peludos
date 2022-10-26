//envia el archivo de middleware
//confnguarion de la documentacion de cloudinary

const cloudinary = require("cloudinary").v2
const multer = require("multer")
const {CloudinaryStorage} = require("multer-storage-cloudinary")

//pasar las credenciales de claudinary

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//crea las configuraciones del bundle
const storage = new CloudinaryStorage({
    cloudinary,
    params: {   //elementos específicos que queremos que dejamos que se permiten 
        allowedFormats: ["jpg", "png"],
        folder: "web-peludos"
    }
})

const uploader = multer({  //sune las imagenes
    storage  //es lo que acabamos de crear arriba
})

module.exports = uploader