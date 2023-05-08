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

app.post("/",function(req,res){
    const pixaAPIKEY = "36162160-9ad290b2b95fe84e106ba7a08";
    const query = "sky";
    const video_type = "film";
    const category = "backgrounds";
    //const min_width const min_height
    const url = "https://pixabay.com/api/videos/?key="+pixaAPIKEY+"&q="+encodeURIComponent(query);
    
    //get video url, apply it to background.
    https.get(url, function(response){
        console.log(response);

        response.on("data",function(data){
            const VideoData = JSON.parse(data);
            const Background_video_url = VideoData.hits[0].videos.large.url;
            res.send(Background_video_url);
        })
        
    })
});



app.get("/plan",function(req,res){
    res.sendFile(__dirname+"/htmls/plan.html");
});


app.listen(3000,function(){
    console.log("3000 server is running.");
});