const express = require("express");
const router = express.Router();
const Products = require("../models/products.model");


const { isAdmin } = require("../middlewares/auth.middlewares.js");

router.get("/create-product", (req, res, next) =>{ 
    res.render("products/create-product.hbs", {
       animals: ["dogs", "cats", "birds", "fishes"]
    })
    
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
        res.redirect("/products/" + animal + "/list")

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

router.get("/:productId/edit-product", isAdmin,  (req, res, next) =>{
    const { productId } = req.params; 
    Products.findById({_id: productId})
    .then((response) => {
        res.render ("products/edit-product.hbs", {
           product: response,
           animals: [
            "dogs", 
            "cats", 
            "birds", 
            "fishes"
           ]
        })
    })
    .catch((error) => {
        next(error)
    })


})

router.post("/:productId/edit", (req, res, next) =>{
    const { productId } = req.params
    const { name, description, productType, animal } = req.body

    const productsToEdit ={
        name,
        description,
        productType,
        animal
    }

    Products.findByIdAndUpdate(productId, productsToEdit)
    .then(() =>{
        res.redirect("/products/" + animal + "/list")
    })
    .catch((error) =>{
        next(error)
    })
})

// Borrar producto
router.post("/:productId/delete", (req, res, next) => {

    // 1. buscar por su id y borrarlo
    Products.findByIdAndDelete(req.params.productId)
    .then((deletedProduct) => {
      // 2. redireccionar a
      res.redirect("/products/" + deletedProduct.animal + "/list")
    })
    .catch((error) => {
      next(error)
    })
  
  })




module.exports = router;