const bodyparser = require("body-parser");
const express = require("express")
const app = express()
app.use(express.urlencoded({extended:true}));
const MongoClient = require('mongodb').MongoClient;
app.set('view engine','ejs');

const request = require("request");
const https = require("https");


app.use('/public', express.static('public'));

//왜안되는지 모르겟음
// var db;
// MongoClient.connect('mongodb+srv://jiui4691:5G6jmgAHJtsJshHV@cluster0.komdm2b.mongodb.net/?retryWrites=true&w=majority'
// ,function(error, client){

//     db = client.db('travelplan');
//     if(error){return console.log("??");}
//     console.log("DB run"); //왜안뜸?

// });

MongoClient.connect('mongodb+srv://jiui4691:5G6jmgAHJtsJshHV@cluster0.komdm2b.mongodb.net/?retryWrites=true&w=majority')
	.then(database => {
		console.log('문제없음');
		app.listen(3000, () => {
			console.log(`Example app listening on port 3000`);
		});
		const db = database.db('travelplan');
		const collection = db.collection('complain');
      	collection.insertOne({complan:'sth'});
	})
	.catch(err => {
		console.log('에러에러');
		console.log(err);
	})
	.finally(() => {
		console.log('끝');
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
    // name="complainText"
    console.log("post request sended");

    var text = req.body.complainText;
    console.log(text); //ok
//여기서부터 안됨; TypeError: Cannot read properties of undefined (reading 'collection')
    db.collection('complain').insertOne({complain:text},()=>{
        console.log("complain saved");
    });
});

    // app.listen(3000, function(){
    //     console.log("Server run");
    // });



