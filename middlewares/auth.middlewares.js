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
    if(req.session.activeUser.admin) { //admin es un booleano que si es true, dice que eres el administrador, sino eres un usuario
        next(); //si eres el administrador continuas
    }
    else{
        res.redirect("/");//si no te redirige a home. 
    }
}

//Base de Datos de los productos de cada animal
//llamada mongo 
//y hacer el CRUD = que el de usuario


module.exports = {
    isLoggedIn,
    isAdmin
}