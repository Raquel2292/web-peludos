const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");


// Rutas de autenticación

//1. GET renderizar vista de registro

router.get("/signup", (req, res, next) =>{
    res.render("auth/signup.hbs")

})

//2. POST recibir la información del formulrio

router.post("/signup", async (req, res, next) =>{


    const { username, email, password, password2 } = req.body

    //1. Validaciones de backend
    // todos los campos deben estar llenos
    if(username === "" || email === "" || password === ""){
        res.render("auth/", {
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
    // Fuerza de contraseña

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
        //2. Elementos de seguridad
        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)


        //3. Crear perfil

        const newUser = {
            username: username,
            email: email,
            password: hashPassword
        }

        await User.create(newUser)
        res.redirect("/profile/my-profile.hbs")

    } catch (error) {
        next(error) 
    } 
})


//3. GET renderizar vista de formulario de acceso a la pagina
router.get("/login", (req, res, next) => {
    res.render("auth/login.hbs")

})
//4. POST recibe credenciales del usuario y valida
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
            res.render("auth/singup.hbs", {
                error5: "Credenciales incorrectas"
            })
            return;
        }
        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
        if (isPasswordCorrect === false ) {
            res.render("auth/singup.hbs", {
                error6: "Credenciales incorrectas"
            })
            return;
        }



        req.session.activeUser = foundUser;
        
        req.session.save(() => {
            res.redirect ("/profile/my-profile")
        })
    } 
    catch (error) {
        next(error)
    }

})

router.get ("/logout", (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
})

module.exports = router;