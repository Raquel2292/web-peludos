const express = require("express");
const router = express.Router();
const Products = require("../models/products.model")


const { isAdmin } = require("../middlewares/auth.middlewares.js");


router.get("/:animal", (req, res, next) =>{
    const { animal } = req.params;
    

    res.render("products/products.hbs", {
        animal: animal
    })
    
    Products.findById(req.session.activeUser._id) 
    .then((response) =>{
        res.render("profile/products.hbs", {
            products: response
        })
        
    }) 
    .catch((error) =>{
        next(error)
    })
})

router.get("/edit-products", isAdmin,  (req, res, next) =>{
    Products.findById(req.session.activeUser._id)
    .then((response) => {
        res.render ("products/edit-products.hbs", {
            userDetails: response
        })
    })
    .catch((error) => {
        next(error)
    })


})

router.post("/:products/edit", (req, res, next) =>{
    const { products } = req.params
    const { name, description, alimentType } = req.body

    const productsToEdit ={
        name,
        description,
        alimentType
    }

    Products.findByIdAndUpdate(products, productsToEdit)
    .then(() =>{
        res.redirect("/products")
    })
    .catch((error) =>{
        next(error)
    })
})



module.exports = router;