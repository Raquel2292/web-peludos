const express = require("express")
const router = express.Router();

const { model, mongoose} = require("mongoose")

const productsSchema = new mongoose.Schema({
    name: String,
    description: String,
    productType: String,
    animal: String,
    
})

const Products = model("Products", productsSchema);

module.exports = Products;