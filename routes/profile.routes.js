const express = require("express");
const router = express.Router();
const User = require("../models/User.model")


const { isLoggedIn } = require("../middlewares/auth.middlewares.js")


router.get("/", isLoggedIn, (req, res, next) => {
    console.log("El usuario hace la solicitud", req.session.activeUser)
    User.findById(req.session.activeUser._id)
    .then((response) => {
        res.render ("profile/profile.hbs", {
            userDetails: response
        })
    })
    .catch((error) => {
        next(error)
    })
})

router.get("/edit-profile", (req, res, next) => {
    console.log("El usuario hace la solicitud", req.session.activeUser)
    User.findById(req.session.activeUser._id)
    .then((response) => {
        res.render ("profile/edit-profile.hbs", {
            userDetails: response
        })
    })
    .catch((error) => {
        next(error)
    })
})

// POST recibe el usuario a editar en mongo
router.post("/:userId/edit", (req, res, next) => {

    // recibir la data a a editar
    const { userId } = req.params
    const { username, email, password } = req.body
  
    const userToEdit = {
      username,
      email,
      password
    }
  
    User.findByIdAndUpdate(userId, userToEdit)
    .then(() => {
      // redireccionar al usuario
      // res.redirect("/profile")
      res.redirect(`/profile`)
    })
    .catch((error) => {
      next(error)
    })
  
  
  })

// Borrar usuario del mongo
router.post("/:userId/delete", (req, res, next) => {

    // 1. buscar por su id y borrarlo
    User.findByIdAndDelete(req.params.userId)
    .then(() => {
      // 2. redireccionar a "/""
      res.redirect("/")
    })
    .catch((error) => {
      next(error)
    })
  
  })


module.exports = router;