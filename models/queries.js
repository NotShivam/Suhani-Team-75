const mongoose=require("mongoose");
const querySchema=mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    message:{
        type:String
    },
    phone:{
        type:String
    },
    subject:{
        type:String
    }
})

module.exports=mongoose.model('query',querySchema);