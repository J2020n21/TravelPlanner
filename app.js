const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use('/public', express.static('public'));

//DB
var db;
MongoClient.connect('mongodb+srv://jiui4691:5G6jmgAHJtsJshHV@cluster0.komdm2b.mongodb.net/?retryWrites=true&w=majority'
,function(error, client){

    if(error){return console.log(error);}
    db = client.db('TravelPlan'); 
    console.log("DB connected");
    
});


//index page
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});

//question page
app.get("/question",(req,res)=>{
    res.render("question.ejs"); 
 });

//plan page; 
app.get("/plan",(req,res)=>{
    res.render("plan.ejs");
});

//show google map


//db and CRUD
//plan page: add place
app.post("/add",(req,res)=>{


});
//plan page: edit 


//plan page:delete


//setting page
app.get("/setting",(req,res)=>{
   res.render("setting.ejs"); 
});

//setting -get complain from the users
 app.get("/setting-problem",(req,res)=>{
    res.render("setting-problem.ejs");
 });

//save complain text
app.post('/problemSend',(req,res)=>{
    console.log("post request sended");
    var text = req.body.complainText;
    console.log(text); 
    db.collection('complain').insertOne({complain:text},(err,result)=>{
        if(err) return console.log(err);
        res.write("complain saved");
    });
});


app.listen(3000, function(){
    console.log("Server run");
});