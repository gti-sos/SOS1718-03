 /*index lab04
    var express = require("express");
    var app = express();
    app.get("/hello",(req,res)=>{
       res.send("hello world!");
    });
    app.listen(process.env.PORT);*/
    
    //index Lab06

var express = require("express");
var bodyParser = require("body-parser");



var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";


var app = express();
app.use("/",express.static(__dirname+"/public"));
app.use(bodyParser.json());

var cities = [
    
    {"name"  :  "Ciudad-Real",
    "solarPlant" :"Parque-fotovoltaico-Puertollano",
    "year" : "2010"
    },
    
     {"name"  :  "Cuenca",
    "solarPlant" :"Parque-fotovoltaico-Olmedilla-de-Alarcon",
     "year" : "2010"
     },
    
     {"name"  :  "Caceres",
    "solarPlant" :"Planta-solar-fotovoltaica-La-Magascona-y-La-Magasquilla",
    "year" : "2010"     
     },
     
     {"name"  :  "La-Rioja",
    "solarPlant" :"Planta-solar-Arnedo",
    "year" : "2010"     
     },
     
      {"name"  :  "Cuenca",
    "solarPlant" :"Planta-solar-Osa-de-la-Vega",
    "year" : "2010"     
     }
   
    ];


    
//--------------------------------------------------------------------------------    
    
    
//GET al conjunto de recursos    
app.get(BASE_API_PATH+"/cities",(req,res)=>{
    console.log(Date() + " - GET /cities");
    res.send(cities);
});



//GET a un recurso concreto /name_solar_plants
 app.get(BASE_API_PATH+"/cities/:solarPlant",(req,res)=>{
     
    var solarPlant = req.params.solarPlant;
     console.log(Date() + " - GET /cities/"+ solarPlant);
    var filteredCities = cities.filter((c)=>{
        return (c.solarPlant == solarPlant);
});

   res.send(filteredCities);
 });
 
//--------------------------------------------------------------------------------

   
// POST al conjunto de recursos   
app.post(BASE_API_PATH+"/cities",(req,res)=>{ 
    console.log(Date() + " - POST /cities");
     var city = req.body;
     cities.push(city);
     res.sendStatus(201);
    
});


//POST a un recurso
app.post(BASE_API_PATH + "/cities/:solarPlant",(req,res)=>{
    var solarPlant = req.params.solarPlant;
     console.log(Date() + " - GET /cities/"+ solarPlant);
    res.sendStatus(405);
}); 

//--------------------------------------------------------------------------------


//DELETE a un conjunto recursos
app.delete(BASE_API_PATH+"/cities",(req,res)=>{
    console.log(Date() + " - DELETE /cities");
    cities = [];
    res.sendStatus(200);
 });


//DELETE a un recurso concreto
app.delete(BASE_API_PATH+"/cities/:solarPlant",(req,res)=>{
    var solarPlant = req.params.solarPlant;
    console.log(Date() + " - DELETE /cities/"+ solarPlant);
    cities = cities.filter((c)=>{
        return c.solarPlant != solarPlant;
    });
   res.sendStatus(200);
}); 

//--------------------------------------------------------------------------------


//PUT a un conjunto
app.put(BASE_API_PATH+"/cities",(req,res)=>{
    console.log(Date() + " - PUT /cities");
    res.sendStatus(405);
});  

//PUT a un recurso concreto
app.put(BASE_API_PATH+"/cities/:solarPlant",(req,res)=>{
    var solarPlant = req.params.solarPlant;
    var updateCities = req.body;
    
    console.log(Date() + " - PUT /cities/"+solarPlant);
    
    if(solarPlant != updateCities.solarPlant){
        res.sendStatus(409);
        return;
    }
   
   cities = cities.map((c)=>{
       if (c.solarPlant == updateCities.solarPlant){
           return updateCities;
       }else{
           return c;
       }
   });
    res.sendStatus(200);
});
   
   
 
   
app.listen(port,()=>{
    
    console.log(" Server ready on port "+port+"!");
    
}).on("error", (e)=>{
    console.log("Server NOT READY:"+e);
});
