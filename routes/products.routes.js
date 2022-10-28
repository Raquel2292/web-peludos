const express = require("express");
const Products = require("../models/products.model");
const router = express.Router();
const uploader = require("../middlewares/cloudinary.js");
const { isAdmin } = require("../middlewares/auth.middlewares.js");

router.get("/create-product", (req, res, next) => {
  res.render("products/create-product.hbs", {
    animals: ["dogs", "cats", "birds", "fishes", "cover"],
  });
});

//ante de llegar a la funcion de la ruta, pasa por cloudinary
router.post("/create-product", uploader.single("cover"),async (req, res, next) => {
    console.log(req.file.path); //=> esto viene de cloudinary y es el URL de acceso a la imagen
    const { name, description, productType, animal } = req.body;

    // Validaciones de backend
    //. todos los campos deben estar llenos
    if (
      name === "" ||
      description === "" ||
      productType === "" ||
      animal === ""
    ) {
      res.render("create-products.hbs", {
        error: "Todos los campos deben estar completos",
      });
      return;
    }

    try {
      // Crear un producto

      const newProduct = {
        name,
        description,
        productType,
        animal,
        cover: req.file.path,
      };
      let newProduct1 = await Products.create(newProduct);
      res.redirect("/products/" + animal + "/list");
      console.log(newProduct1);
    } catch (error) {
      next(error);
    }
  }
);


router.get("/:animal/list", (req, res, next) => {
  // /:animal => productos de ESE animal en concreto.
  const { animal } = req.params;

  Products.find({ animal: animal })
    .then((response) => {
      res.render("products/products.hbs", {
        products: response,
        animal,
      });
    })
    .catch((error) => {
      next(error);
    });
});


//RUTA PARA EDITAR
router.get("/:productId/edit", isAdmin, (req, res, next) => {
  const { productId } = req.params;
  Products.findById(productId)
    .then((response) => {
      res.render("products/edit-product.hbs", {
        product: response,
        animals: ["dogs", "cats", "birds", "fishes"],
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/:productId/edit", (req, res, next) => {
  const { productId } = req.params;
  const { name, description, productType, animal } = req.body;

  const productsToEdit = {
    name,
    description,
    productType,
    animal,
  };

  Products.findByIdAndUpdate(productId, productsToEdit)
    .then(() => {
      res.redirect("/products/" + animal + "/list");
    })
    .catch((error) => {
      next(error);
    });
});



//Rutas de comentarios

router.get("/:productId/comments", (req, res, next) => {
  const { productId } = req.params;
  res.render("products/comments.hbs", {
    productId,
  });
});

router.post("/:productId/comments", (req, res, next) => {
    const { comments } = req.body;
    const { productId } = req.params;
  Products.findById(productId).then((response) => {
    response.comments.push(comments);
    Products.findByIdAndUpdate(productId, response).then(() => {
      res.redirect("/products/" + response.animal + "/list");
    });
  });
});

// Borrar producto
router.post("/:productId/delete", (req, res, next) => {
  // 1. buscar por su id y borrarlo
  Products.findByIdAndDelete(req.params.productId)
    .then((deletedProduct) => {
      // 2. redireccionar a
      res.redirect("/products/" + deletedProduct.animal + "/list");
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:productId/detail", (req, res, next) => {
  const { productId } = req.params;
  Products.findById(productId)
    .then((response) => {
    res.render("products/detail.hbs", {
    product: response
  });
});
});

module.exports = router;
