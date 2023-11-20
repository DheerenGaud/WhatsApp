const mongoose = require("mongoose")

const userSchema=mongoose.Schema({
     Name:{
        type: String,
        required: true,
      },
     email:{
        type: String,
        required: true,
        unique: true, 
      },
     profilePic:{
        type: String,
      },
      sub:{
        type:String,
        unique: true, 
      }
})

module.exports= mongoose.model("user",userSchema);