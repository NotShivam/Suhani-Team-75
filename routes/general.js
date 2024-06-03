const router = require("express").Router();
const Query=require('../models/queries');
// const imageToText=require("../config/tesseract");
let model=require("../trainedModel/model.json");
const {auth,isAdmin}=require('../config/jwt-config');


const upload= require("../config/multer-connection"); 
const Women = require("../models/women");
const User = require("../models/user");
router.post('/contact-us',async (req,res,next)=>{
    try{
        let query=new Query(req.body);
        await query.save();
        res.send(query);
    }
    catch(err){
        next(err);
    }
})
router.post('/image-to-text',upload.array('image',1),async(req,res,next)=>{
    try{
        let img=req.files[0];
        console.log(img);
        // let text=await imageToText(img.location);
        res.send("Hello");
    }
    catch(err)
    {
        next(err);
    }
})
router.get('/model',async(req,res,next)=>{
    try{
        res.send(model);
    }
    catch(err)
    {
        next(err);
    }
})
router.get('/tracker',auth,async(req,res,next)=>{
    try{
        let women=await Women.find({});
        let user=await User.find({});
        res.send({women,user});
    }
    catch(err)
    {
        next(err);
    }
})
module.exports=router;