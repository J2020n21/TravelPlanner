const bodyparser = require("body-parser");
const express = require("express")
const app = express()
app.use(express.urlencoded({extended:true}));
const MongoClient = require('mongodb').MongoClient;
app.set('view engine','ejs');

const request = require("request");
const https = require("https");


app.use('/public', express.static('public'));

var db;
MongoClient.connect('mongodb+srv://jiui4691:5G6jmgAHJtsJshHV@cluster0.komdm2b.mongodb.net/?retryWrites=true&w=majority')
	.then(database => {
		console.log('OK');
		app.listen(3000, () => {
			console.log(`Example app listening on port 3000`);
		});
		db = database.db('travelplan');
		//collection_claim = db.collection('complain');
      	//collection_claim.insertOne({complan:'sth'});
	})
	.catch(err => {
		console.log('ERROR');
		console.log(err);
	})
	.finally(() => {
		console.log('END');
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
    console.log(text); //ok

    db.collection('complain').insertOne({complain:text});
	//res.send("OKAY");
});



//Don't use callback function with db...



