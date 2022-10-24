const router = express.Router();

const Schema = new mongoose.Schema({
    name: String,
    description: String,
    type: [
        alimentacion,
        snacks,
        accesorios,
        saludEhigiene
    ],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Products"
    }]
})

module.exports = Products;