const express = require("express");
const router = express.Router();

// Rutas de autenticación

//1. GET renderizar vista de registro

router.get("/signup", (req, res, next) =>{
    res.render("auth/signup.hbs")

})

//2. POST recibir la información del formulrio

router.post("/signup", (req, res, next) =>{


    const { username, email, password } = req.body

    //1. Validaciones de backend
    // todos los campos deben estar llenos
    if(username === ""){
        res.render("auth/signup.hbs", {
            error: "Debes tener un nombre de Usuario"

        })
        return;
        
    }if(email === ""){
        res.render("auth/signup.hbs", {
            error1: "Debes tener un Email"
        })
        return;
    }if(password === ""){
        res.render("auth/signup.hbs", {
            error2: "Deber tener un Password"
        })
        return;
    }

    // Validación de email

    const emailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    if (emailValidation.test(email) === false){
        res.render("auth/signup.hbs", {
            error: "Deber colocar un formato valido de correo electronico"
        })
    }
    // Fuerza de contraseña

    const passwordStrong = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    if (passwordStrong.test(password) === false){
        res.render("auth/signup.hbs", {
            error2: "La contraseña un minimo de 8 caracteres. una letra mayuscula y un número"
        })
        return;
    }

    //2. Elementos de seguridad

    //3. Crear perfil







    res.redirect("/")

})


//3. GET renderizar vista de formulario de acceso a la pagina
router.get("/login", (req, res, next) =>{
    res.render("auth/login.hbs")

})
//4. POST recibe credenciales del usuario y valida




module.exports = router;