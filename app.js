const express = require('express');
const app = express();
const PORT = 5000;
const path = require('path'); // package de base de node permettant de créer des chemin d'accès absolu
//const cors = require("cors"); // ajoute module cors npm i cors


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(middlewareGetWheater); //Exécuter le middleware de façon globale sur tt le code
//app.use(cors());
app.use('/public',express.static(__dirname + '/public')); //Middleware définir un repertoire avec des fichiers statiques (css, js, pnj ,...) qui ne seront pas analyser par le Server


app.set("view engine", "ejs"); //paramétrer usage d'un moteur de template
app.set("views", path.join(__dirname, "views")); // définir le chemin d'accès en absolu vers les documents de template


function middlewareGetWheater(req, res, next){
	req.visitorWheater = false; // ajouter une variable au tableau requête 
	if(req.visitorWheater){
		res.send('<h1>Sorry, you can not play on that peach Today!!!</h1> <br/>it is raining!!');	
	}else{
		next(); // Ajouter next() si on veut que le code qui arrive
				// après notre middleware soit exécutée next() est similaire à (continu;) dans un boucle
				// son absence crée un point break
	}
}


app.post('/result', (req, res)=>{ // J'execute un middleware avant le code de la ressource sollicitée
	res.send(`<h1>Wellcomme My Friend!</h1> Your Favorite color is: ${req.body.color}`);
});


app.get('/',(req, res)=>{
	
	res.render("index",{
				isRaining: req.visitorWheater,
				visitors: [
					{name:"Alan", visit:356, lastVisite: Date()}, 
					{name:"Avomo", visit:5, lastVisite:"2023-05-03"}, 
					{name:"Clovis", visit:596, lastVisite: Date()}
					]	
			 }); // render permet de passer en parametre le nom du template et les données
});

app.get('/bootstrap',(req, res)=>{
	res.render("bootstrap");
});



app.listen(PORT);
console.log('learnWebCode Server is running ...');