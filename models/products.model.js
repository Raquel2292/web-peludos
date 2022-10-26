const express = require("express")
const router = express.Router();

const { model, mongoose} = require("mongoose")

const productsSchema = new mongoose.Schema({
    name: String,
    description: String,
    productType: String,
    animal: String,
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Products"
   }],
   cover: String, //imagen cloudinary
})

const Products = model("Products", productsSchema);

module.exports = Products;