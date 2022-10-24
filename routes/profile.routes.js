const express = require("express");
const router = express.Router();


const { isLoggedIn, isAdmin } = require ("../middlewares/auth.middlewares.js");


router.get("/", isLoggedIn, (req, res, next) => {
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

router.get ("/admin.hbs", isLoggedIn, isAdmin, (req, res, next) => {
    res.render("profile/admin.hbs")
})







module.exports = router;