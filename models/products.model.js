const express = require("express")
const router = express.Router();

const { model, mongoose} = require("mongoose")

const productsSchema = new mongoose.Schema({
    name: String,
    description: String,
    productType: String,
    animal: String,
    comments:[String],
   cover: String, //imagen cloudinary
})

const Products = mongoose.model ("Products", productsSchema);

module.exports = Products;