const router = require("express").Router();
const User=require("../models/user");
const {auth,isAdmin}=require('../config/jwt-config');
const jwt=require('jsonwebtoken');
const stripe = require('stripe')(process.env.SECRET_KEY_TEST);
const multer = require("multer");
const upload= require("../config/multer-connection"); 
const decodeJwtResponse=require("../config/decode_jwt");
const Women=require('../models/women.js');
const run=require('../tensor/tensor.js');
router.get("/signin",(req,res,next)=>{
    res.render('signin');
});
router.post('/signup',async (req,res,next)=>{
    try{
        let found=await User.findOne({email:req.body.email});
        if(found)
        {
            throw new Error('User Already Exist');
        }
        console.log(req.body);
        
        let user=new User(req.body);
        user.remainingDays=60;
        let token = await user.createAuthToken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 5000000000),
            httpOnly: true,
        });
        res.send(user);
    }
    catch(err){
        next(err);
    }
})
router.post('/signin',async (req,res,next)=>{
    try{
        let found=await User.findOne({email:req.body.email});
        if(found)
        {
            if(found.password===req.body.password)
            {
                let token = await found.createAuthToken();
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 5000000000),
                    httpOnly: true,
                });
                res.send({status:"Success"});
            }
            else{
                throw new Error('Invalid User Detail');
            }
        }
        else{
            throw new Error('User Not Found');
        }
    }
    catch(err){
        next(err);
    }
})

router.get('/signout',auth,async(req,res,next)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
          });
          await req.user.save();
          res.status(200).json("Signout Successfully");
    }
    catch(err){
        next(err);
    }
})
router.get('/user-info',auth,async(req,res,next)=>{
    try{
        res.send(req.user);
    }
    catch(err)
    {
        next(err);
    }
})

//Google signup
// router.post('/google-signup',async(req,res,next)=>{
//     try{
//         console.log("This is signup");
//         console.log(req.body);
//         const responsePayload = decodeJwtResponse(req.body.credential);
//         req.body.email=responsePayload.email;
//         req.body.name=responsePayload.name;
//         console.log("ID: " + responsePayload.sub);
//         console.log("Full Name: " + responsePayload.name);
//         console.log("Given Name: " + responsePayload.given_name);
//         console.log("Family Name: " + responsePayload.family_name);
//         console.log("Image URL: " + responsePayload.picture);
//         console.log("Email: " + responsePayload.email);
//         let found=await User.findOne({email:responsePayload.email});
//         if(found)
//         {
//             throw new Error('User already exist!');
//         }
//         else{
//             let user=User(req.body);
//             user.remainingDays=60;
//             let token = await user.createAuthToken();
//             res.cookie("jwt", token, {
//                 expires: new Date(Date.now() + 5000000000),
//                 httpOnly: true,
//             });
//             res.send(user);
//         }
//     }
//     catch(err)
//     {
//         next(err);
//     }
// })
//Google signin
router.post('/google-signin',async(req,res,next)=>{
    try{
        console.log(req.body);
        const responsePayload = decodeJwtResponse(req.body.credential);
        req.body.email=responsePayload.email;
        req.body.name=responsePayload.name;
        console.log("ID: " + responsePayload.sub);
        console.log("Full Name: " + responsePayload.name);
        console.log("Given Name: " + responsePayload.given_name);
        console.log("Family Name: " + responsePayload.family_name);
        console.log("Image URL: " + responsePayload.picture);
        console.log("Email: " + responsePayload.email);
        let user=await User.findOne({email:responsePayload.email});
        if(user)
        {
            let token = await user.createAuthToken();
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 5000000000),
                httpOnly: true,
            });
            res.render('empty');
        }
        else{
            let user=User(req.body);
            user.remainingDays=60;
            let token = await user.createAuthToken();
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 5000000000),
                httpOnly: true,
            });
            res.send(user);
        }
    }
    catch(err)
    {
        next(err);
    }
})

//Payments

//Profile Update
router.post('/change-profile',auth,async (req,res,next)=>{
    try{
        
    }
    catch(err)
    {
        next(err);
    }
})

//Set Profile Pic
router.post('/profile-pic',auth,upload.array('image',1),async(req,res,next)=>{
    try{
        console.log("hello");
        console.log(req.files);
        // console.log(img);
        let img=req.files[0];
        req.user.profilePic=img.location;
        // let user=await User.findById(req.user._id);
        // user.profilePic=img.location;
        await req.user.save();
        res.send(req.user);
    }
    catch(err)
    {
        next(err);
    }
})
router.post('/savewomen',auth,upload.array('image',1),async(req,res,next)=>{
    try{
        console.log("hello");
        console.log(req.body);
        let id=req.body.id;
        let img=req.files[0];
        let help=req.body.name.toLowerCase();
        console.log(help);
        let temp=await Women.findById(id);
        if(!temp)
        {
            throw new Error('No such women exist');
        }
        console.log(temp);
        temp.height=req.body.height;
        temp.weight=req.body.weight;
        temp.haemoglobin=req.body.haemoglobin;
        temp.bloodPressure=req.body.bloodPressure;
        temp.location=req.body.location;
        temp.month=req.body.month;
        temp.worker=req.user._id;
        temp.verification=img.location;
        await temp.save();
        res.send({women:temp});
    }
    catch(err)
    {
        next(err);
    }
})
router.post('/addwomen',auth,upload.array('image',1),async(req,res,next)=>{
    try{
        console.log("add women");
        console.log(req.body);
        let women=new Women(req.body);
        women.worker=req.user._id;
        req.user.womens.push(women._id);
        women.save();
        await req.user.save();
        res.send({status:"Success"});
    }
    catch(err)
    {
        next(err);
    }
})
router.post('/prediction',auth,async(req,res,next)=>{
    try{
        // let x=[{
        //     "bloodPressure": 140,
        //     "month": 8,
        //     "height": 48,
        //     "weight": 88
        //   }];
        //   let data=await run(x);
        // console.log(req.body);
        let women=await Women.findById(req.body.id);
        let x=[];
        let obj={};
        obj.weight=parseInt(women.weight);
        obj.height=parseInt(women.height);
        obj.bloodPressure=parseInt(women.haemoglobin);
        obj.month=parseInt(women.month);
        x.push(obj);
        // console.log(x);
        let data=await run(x);
        // console.log(data);
        res.send({data,women});
    }
    catch(err)
    {
        next(err);
    }
})

router.post('/getwomendetails',auth,async(res,req,next)=>{
    try{
        console.log(req.body);
        let temp=await Women.findById(req.body.id.id);
        res.send(temp);
    }
    catch(err)
    {
        next(err);
    }
})
module.exports=router;