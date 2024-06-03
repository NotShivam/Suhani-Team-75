const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
exports.auth = async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne({ _id: decode._id, "tokens.token": token });
      if (!req.user) {
        throw new Error();
      }
      req.token = token;
      next();
    } catch (e) {
      res.status(401).send({ error: "Please Authenticate" });
    }
  };
  
  exports.isAdmin=async(req,res,next)=>{
    try{
      if(req.user.role!==1){
        throw new Error();
      }
      next();
    }
    catch(e)
    {
      res.status(401).send({error:"You are not authorized on these page"});
    }
  }