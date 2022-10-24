const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

const { isLoggedIn } = require ("../middlewares/auth.middlewares.js")

router.get ("/", isLoggedIn, (req, res, next) => {
    User.findById(req.session.activeUser._id)
    .then((response) => {
        res.render("auth/login.hbs", {   
            userDetails: response
        })
    })
    .catach((error) => {
        next(error)
    })
})











module.exports = router;