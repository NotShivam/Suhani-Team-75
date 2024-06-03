const mongoose=require('mongoose');
const jwt = require("jsonwebtoken");
const womenSchema=mongoose.Schema({
    name:{
        type:String
    },
    location:{
        type:String
    },
    gender:{
        type:String
    },
    bloodPressure:{
        type:String
    },
    haemoglobin:{
        type:String,
    },
    month:{
        type:Number,
    },
    height:{
        type:String,
    },
    weight:{
        type:String
    },
    worker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    verification:{
        type:String
    }
})
  module.exports = mongoose.model("women", womenSchema);