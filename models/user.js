const mongoose=require('mongoose');
const jwt = require("jsonwebtoken");
const userSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    role:{
        type:Number,
        default:0
    },
    remainingDays:{
        type:Number,
        defalut:60
    },
    tokens:[
        {
            token: {
            type: String
            },
        },
    ],
    membership:{
        type:String,
        default:'basic'
    },
    profilePic:{
        type:String
    },
    womens:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'women'
    }]
})
userSchema.methods.createAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token: token }); //.concat combines two or more array
    // console.log(user);
    await user.save();
    return token;
  };
  module.exports = mongoose.model("user", userSchema);