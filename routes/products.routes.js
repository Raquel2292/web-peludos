const express = require("express");
const router = express.Router();
const Products = require("../models/products.model");


const { isAdmin } = require("../middlewares/auth.middlewares.js");

router.get("/create-product", (req, res, next) =>{ 
    res.render("products/create-products.hbs")
    
})


router.post("/create-product", async (req, res, next) =>{


    const { name, description, productType, animal } = req.body

    // Validaciones de backend
    // todos los campos deben estar llenos
    if(name === "" || description === "" || productType === "" || animal === ""){
        res.render("create-products", {
            error: "Todos los campos deben estar completos"
        })
        return;
    }

    try {
        // Crear un producto

        const newProduct = {
            name,
            description,
            productType,
            animal
        }

        await Products.create(newProduct);
        res.redirect("/products")

    } catch (error) {
        next(error) 
    } 
})

router.get("/:animal/list", (req, res, next) =>{ // /:animal => productos de ESE animal en concreto. 
    const { animal } = req.params;

    Products.find({animal: animal})
    .then((response) =>{
        res.render("products/products.hbs", {
            products: response,
            animal
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