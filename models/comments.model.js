const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
    type: mongoose.Schema.Types.ObjectId,
});

const Comments = mongoose.model("Comments", modelSchema);

module.exports = Comments;