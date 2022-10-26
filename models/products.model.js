<<<<<<< HEAD
const express = require("express")
const router = express.Router();

const { model, mongoose} = require("mongoose")
=======

const mongoose = require("mongoose")
>>>>>>> 06846b395a99fd0725fe5a5519dcca3b47ec4ebb

const productsSchema = new mongoose.Schema({
    name: String,
    description: String,
    productType: String,
    animal: String,
    
})

const Products = mongoose.model ("Products", productsSchema);

module.exports = Products;