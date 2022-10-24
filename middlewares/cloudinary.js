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
const storage = CloudinaryStorage({
    cloudinary,
    params: {
        allowedFormats: ["jpg", "png"],
        folder: "web-peludos"
    }
})

const uploader = multer({
    storage
})

module.exports = uploader