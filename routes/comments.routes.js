const express = require("express");
const router = express.Router();
const Comments = require("../models/comments.model");

const { isLoggedIn } = require ("../middlewares/auth.middlewares.js");
const User = require("../models/User.model");


router.get("/products/details-products", isLoggedIn, (req, res, next) =>{
    User.findById(req.session.activeUser._id)
    .then((response) => {
        res.render("products/details-products.hbs")
    })


} )

router.post("/:comments/products", (req, res, next) =>{

})








module.exports = router;
