const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");


// Rutas de autenticación

// GET renderizar vista de registro

router.get("/signup", (req, res, next) =>{
    res.render("auth/signup.hbs")

})

// POST recibir la información del formulrio

router.post("/signup", async (req, res, next) =>{


    const { username, email, password, password2 } = req.body

    // Validaciones de backend
    // todos los campos deben estar llenos
    if(username === "" || email === "" || password === ""){
        res.render("signup", {
            error: "Todos los campos están completos"

        })
        return;
    }
    if (password !== password2){
        res.render("auth/", {
            error2: "Las contraseñas no coinciden"
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
    // Contraseña

    const passwordStrong = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    if (passwordStrong.test(password) === false){
        res.render("auth/signup.hbs", {
            error2: "La contraseña un minimo de 8 caracteres. una letra mayuscula y un número"
        })
        return;
    }

    try {

        const foundUser = await User.findOne({username:username})
        if(foundUser !== null){
            res.render("auth/signup.hbs", {
                error3: "Este Usuario ya Existe"
            })
            return;
        }
        //Elementos de seguridad
        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)


        // Crear perfil

        const newUser = {
            username: username,
            email: email,
            password: hashPassword
        }

        await User.create(newUser)
        res.redirect("/auth/login")

    } catch (error) {
        next(error) 
    } 
})


// GET renderizar vista de formulario de acceso a la pagina
router.get("/login", (req, res, next) => {
    res.render("auth/login.hbs")

})
// POST recibe credenciales del usuario y valida
router.post ("/login", async (req, res, next) => {
    const {email, password} = req.body
    
    if(email === "" || password === "") {
        res.render("auth/login.hbs", {
            error4: "Rellene todos los campos"
        })
        return;
    }

    try {
        //Busca el usuario en la BD
        const foundUser = await User.findOne({email: email})
        if(foundUser === null) {
            res.render("auth/signup.hbs", {
                error5: "Credenciales incorrectas"
            })
            return;
        }
        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
        if (isPasswordCorrect === false ) {
            res.render("auth/signup.hbs", {
                error6: "Credenciales incorrectas"
            })
            return;
        }

        req.session.activeUser = foundUser; //crea la sesion y la cookie
        
        req.session.save(() => {
            res.redirect ("/")
        })
    } 
    catch (error) {
        next(error)
    }

})

router.get("/logout", (req, res, next) => {
    req.session.destroy(() => {
      res.redirect("/")
    })
  })
  


module.exports = router;