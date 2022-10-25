const express = require("express");
const router = express.Router();
const Products = require("../models/products.model")


const { isAdmin } = require("../middlewares/auth.middlewares.js")


router.get("/:animal", (req, res, next) =>{
    const { animal } = req.params;

    res.render("products/products.hbs", {
        animal: animal
    })

    /*Products.findById(req.session.activeUser._id) //en vez de por un id que busque por una propiedad (propiedad de perro, de gato...)
    .then((response) =>{
        res.render("profile/products.hbs", {
            products: response
        })
        
    }) 
    .catch((error) =>{
        next(error)
    })*/
})

router.get("/edit-products", isAdmin,  (req, res, next) =>{
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