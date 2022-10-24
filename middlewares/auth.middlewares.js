const isLoggedIn = (req, res, next) => {
    console.log(req.session.activeUser)
    if (req.session.activeUser === undefined) {
        res.redirect("/auth/login") //si no tienes sesión, te saca
    }
    else {
        next() // si tienes, sigues.
    }
}



module.exports = {
    isLoggedIn,
}