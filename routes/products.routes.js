const express = require("express");
const router = express.Router();
const Products = require("../models/products.model");


const { isAdmin } = require("../middlewares/auth.middlewares.js")


router.get("/:animal", (req, res, next) =>{ // /:animal => productos de ESE animal en concreto. 
    const { animal } = req.params;

    res.render("products/products.hbs", {
        animal: animal
    })
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