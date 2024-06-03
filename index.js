const express = require('express');
const path=require('path');
const ejs=require('ejs');
const cookieParser=require('cookie-parser');
const mongoose=require("mongoose");
const app = express();
const userRoutes=require('./routes/userRoutes');
const generalRoutes=require("./routes/general");
const port = 3000;
const {auth,isAdmin}=require('./config/jwt-config')
const User=require('./models/user');
require('dotenv').config()
require('./config/remaining-days');
const run=require('./tensor/tensor');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Serving static files
app.use(express.static(path.join(__dirname, 'static')));

//db connection
mongoose.connect("" + process.env.MONGODB_URL, {}, () => {
  console.log("Connected to DB");
});

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates/views'));


//Main Pages
app.get('/', (req, res) => {
  res.render('homepage')
})
app.get('/signin',(req,res)=>{
  res.render('signin');
})
app.get('/contact',(req,res)=>{
  res.render('contact');
})
app.get('/profile',auth,(req,res)=>{
  res.render('profile',{user:req.user});
})
app.get('/dashboard',auth,async(req,res)=>{
  let user=await User.findById(req.user._id).populate('womens');
  res.render('dashboard',{user:user});
})

app.get('/tracker',auth,async(req,res)=>{
  res.render('tracker');
})
// app.get('/admin',auth,(req,res)=>{
//   res.render('admin');
// })
//Routing
app.use("/api/user",userRoutes);
app.use("/api/general",generalRoutes);

//Error Handler
app.use(function (err, req, res,next) {
  res.send({ status: err.status, error: err.message });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})