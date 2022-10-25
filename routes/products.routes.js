const express = require("express");
const router = express.Router();
const Products = require("../models/products.model")


const { isAdmin } = require("../middlewares/auth.middlewares.js")


router.get("/", isAdmin, (req, res, next) =>{
    Products.findById(req.session.activeUser._id)
    .then((response) =>{
        res.render("profile/products.hbs", {
            productDetails: response

        })
        
    }) 
    .catch((error) =>{
        next(error)
    })
})

router.get("/edit-products", (req, res, next) =>{
    User.findById(req.session.activeUser._id)
    .then((response) => {
        res.render ("profile/edit-products.hbs", {
            userDetails: response
        })
    })
    .catch((error) => {
        next(error)
    })


})

module.exports = router;