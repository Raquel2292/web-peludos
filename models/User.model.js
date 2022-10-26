const { Schema, model, mongoose } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true,
      
     
      
    },

    favorites:[
      {
        type: Schema.Types.ObjectId,
        ref: "Products"

      }
    ],
      
   

    role:{
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    photo: String,
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Products"
    }]
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
