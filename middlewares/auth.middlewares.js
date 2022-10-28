const isLoggedIn = (req, res, next) => {
    console.log(req.session.activeUser)
    if (req.session.activeUser === undefined) {
        res.redirect("/auth/login") //si no tienes sesión, te saca
    }
    else {
        next() // si tienes, sigues.
    }
}

const isAdmin = (req, res, next) => {
    console.log(req.session.activeUser.role)
    if(req.session.activeUser.role === "admin") { //admin es un booleano que si es true, dice que eres el administrador, sino eres un usuario
        next(); //si eres el administrador continuas
    }
    else{
        res.redirect("/");//si no te redirige a home. 
    }
}



module.exports = {
    isLoggedIn,
    isAdmin
}