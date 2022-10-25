const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    photo: String,
    Id: ObjectId,
    Ref: Admin,
})

const Admin = mongoose.model ("Admin", adminSchema);

module.exports = Admin;