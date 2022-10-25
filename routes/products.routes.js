
const express = require("express");
const Products = require("../models/products.model");
const router = express.Router();


router.get("/", (req, res, next) =>{
    Products.findById()
    .then((response) =>{
        res.render("profile/products.hbs", {
            productsDetails: response
        })
       
    })
    .catch((error) =>{
        next(error)
    })
    

})


router.post()

module.exports = router;