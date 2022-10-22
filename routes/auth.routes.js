const express = require("express");
const router = express.Router();

// Rutas de autenticación

//1. GET renderizar vista de registro

router.get("/signup", (req, res, next) =>{
    res.render("auth/signup.hbs")

})

//2. POST recibir la información del formulrio

router.post("/signup", (req, res, next) =>{





    res.redirect("/")

})


//3. GET renderizar vista de formulario de acceso a la pagina
router.get("/login", (req, res, next) =>{
    res.render("auth/login.hbs")

})
//4. POST recibe credenciales del usuario y valida




module.exports = router;