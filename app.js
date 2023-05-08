const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const { dirname } = require("path");
const app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/htmls/index.html");
});

app.listen(3000,function(){
    console.log("3000 server is running.");
});