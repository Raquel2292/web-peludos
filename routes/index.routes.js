const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const profileRoutes = require("./profile.routes");
router.use("/profile", profileRoutes);

const userAdminRoutes = require("./user-admin.routes");
router.use("/user-admin", userAdminRoutes);

const productsRoutes = require("./products.routes");
router.use("/products", productsRoutes); //prodcutos del animal


module.exports = router;
