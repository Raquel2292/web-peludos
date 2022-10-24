const express = require("express");
const router = express.Router();
const User = require("../models/User.model")


const { isLoggedIn } = require("../middlewares/auth.middlewares.js")

router.get("/", isLoggedIn, (req, res, next) => {
    console.log("El usuario hace la solicitud", req.session.activeUser)
    User.findById(req.session.activeUser._id)
    .then((response) => {
        res.render ("profile/my-profile.hbs", {
            userDetails: response
        })
    })
    .catch((error) => {
        next(error)
    })
})

//EDITAR PERFIL


module.exports = router;