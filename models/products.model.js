const router = express.Router();
const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    name: String,
    description: String,
    alimentType: String,
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Products"
   }] 
})

const Products = model("Products", productsSchema);

module.exports = Products;