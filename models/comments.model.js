const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    products:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"


    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"

    },

    comments: String

    

    

});

const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;