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

const commentsRoutes = require("./comments.routes");
router.use("/comments", commentsRoutes);

const userAdminRoutes = require("./user-admin.routes");
router.use("/user-admin", userAdminRoutes);

const productsRoutes = require("./products.routes");
router.use("/products", productsRoutes);


module.exports = router;
