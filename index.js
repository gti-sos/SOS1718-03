 //index lab04
    // var express = require("express");
    //var app = express();
    //app.get("/hello",(req,res)=>{
    //   res.send("hello world!");
    //});
    //app.listen(process.env.PORT);

//index Lab05 

var express = require("express");
var bodyParser = require("body-parser");


var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";

var app = express();
app.use("/",express.static(__dirname+"/public"));
app.use(bodyParser.json());

var cities = [
    
    {"name"  :  "Ciudad_Real",
    "name solar plants" :"Parque fotovoltaico Puertollano",
    "year" : 2016
    },
    
     {"name"  :  "Cuenca",
    "name solar plants" :"Parque fotovoltaico Olmedilla de Alarcón"},
    
     {"name"  :  "Cuenca",
    "name solar plants" :"Parque fotovoltaico Olmedilla de Alarcón2"}
   
    ];
//GET al conjunto de recursos    
app.get(BASE_API_PATH+"/cities",(req,res)=>{
    
    res.send(cities);
});

 
//GET a un recurso concreto
 app.get(BASE_API_PATH+"/cities/:name",(req,res)=>{
    var name = req.params.name;
    
    var filteredCities = cities.filter((c)=>{
        return c.name === name;
});
   res.send(filteredCities);
 });   

   
// POST al conjunto de recursos   
app.post(BASE_API_PATH+"/cities",(req,res)=>{  
   
     var city = req.body;
     cities.push(city);
     res.sendStatus(201);
    
});

//DELETE a un recurso concreto
app.delete(BASE_API_PATH+"/cities/city",(req,res)=>{ 
    var city = req.body;
    cities.pop(city);
    res.sendStatus(200);
});    
   
   
app.listen(port,()=>{
    
    console.log(" Server ready on port "+port+"!");
    
}).on("error", (e)=>{
    console.log("Server NOT READY:"+e);
});
