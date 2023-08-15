const bodyparser = require("body-parser");
const express = require("express")
const app = express()
app.use(express.urlencoded({extended:true}));
const MongoClient = require('mongodb').MongoClient;
app.set('view engine','ejs');

const request = require("request");
const https = require("https");


app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'travel/build')))

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
    res.render("index.ejs");
});

//question page
app.get("/question",(req,res)=>{
    res.render("question.ejs"); 
 });

//plan page; 
app.get("/plan",(req,res)=>{
	db.collection('setting').findOne({_id:parseInt(200)},(err,result)=>{
		res.render("plan.ejs",{settings:result});
		console.log(result);
	});
 });


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
	res.send("The complain accepted.");
});

app.get("/loading",(req,res)=>{
	res.sendFile(__dirname+"/public/loading.html");
});

// https://maps.googleapis.com/maps/api/place/findplacefromtext/json
//   ?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry
//   &input=Museum%20of%20Contemporary%20Art%20Australia
//   &inputtype=textquery
//   &key=AIzaSyAY6AUO3bJvykH8YxldX-yppdDiNjJBYrI


//https://console.cloud.google.com/google/maps-apis/home;onboard=true?project=sharp-technique-321106&utm_source=Docs_GS_Button&;ref=https:%2F%2Fdevelopers.google.com%2Fmaps%2F&;hl=ko&hl=ko&_gl=1*1v3uh1g*_ga*MTczNzk0NzgwMy4xNjg0MjI4NzM3*_ga_NRWSTWS78N*MTY4NDIyODczNy4xLjEuMTY4NDIyODg5MC4wLjAuMA..
//Don't use callback function with db...



