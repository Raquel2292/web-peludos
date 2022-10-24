const router = express.Router();
const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: [
        "alimentacion",
        "snacks",
        "accesorios",
        "saludEhigiene"
    ],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Products"
    }]
})

const Products = model("Products", productsSchema);

module.exports = Products;