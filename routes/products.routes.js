
const express = require("express");
const router = express.Router();


const { isAdmin } = require("../middlewares/auth.middlewares.js")


router.get("/", (req, res, next) =>{
    Products.find()
    .then((response) =>{
        res.render("profile/products.hbs", {
            productDetails: response

        })
        
    }) 
    .catch((error) =>{
        next(error)
    })
})

module.exports = router;