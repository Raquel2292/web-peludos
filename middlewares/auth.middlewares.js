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
    if(req.session.activeUser.role !== "admin") {
        res.redirec("/auth/login")
    }
    else {
        next()
    }
}

module.exports = {
    isLoggedIn,
    isAdmin
}