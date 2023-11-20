const mongoose = require("mongoose")

const contact={
    Notification:{
        type:Number,
        default:-1,
        require:true

    },
    data_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "data",
    },
    access:{
        type:Boolean,
        default:false,
        require:true
    },
    type:{
        type: String,
    },
    status_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "status",   
         },
    status_view:{
        type:Number,
        default:-1,
        require:true
    },
    user_id:{
        type:String,
    },
    group_id:{
        type:String,
    }
}

const contactSchema=mongoose.Schema({
     user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        uniqui:true
      },
      contacts:[contact]
})

module.exports= mongoose.model("contact",contactSchema);