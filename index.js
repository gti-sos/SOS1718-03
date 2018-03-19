
//IndexLab6

var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");


var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
var dbFileName = __dirname+"/iglobalWarmings.db"

var app = express();
app.use("/",express.static(__dirname+"/public"));
app.use(bodyParser.json());


// -------------ADAN---------------
var pollutionCities = [
    
     {"city"  :  "madrid",
    "station" :"fernandez-ladreda-oporto",
    "year" : "2014"
    },
    
     {"city"  :  "barcelona",
    "station" :"l-eixample",
    "year" : "2014"
    },
    
     {"city"  :  "barcelona",
    "station" :"gracia-sant-gervasi",
    "year" : "2014"
    },
     
     {"city"  :  "madrid",
    "station" :"escuelas-aguirre",
    "year" : "2014"
    },
     
     {"city"  :  "valencia",
    "station" :"pista-de-silla",
    "year" : "2014"
    }
   
    ];
    
app.get(BASE_API_PATH + "/pollutionCities/loadInitialData", function (req, res){
     var inicializacion = [{"city"  :  "madrid",
    "station" :"fernandez-ladreda-oporto",
    "year" : "2014"
    },
    
     {"city"  :  "barcelona",
    "station" :"l-eixample",
    "year" : "2014"
    }];
    pollutionCities=inicializacion;
    console.log("Initializing data"); 
    res.send(pollutionCities);
    res.sendStatus(201);
    console.log("Data initialized");
});    
    
    
//GET al conjunto de recursos    
app.get(BASE_API_PATH+"/pollutionCities",(req,res)=>{
    console.log(Date() + " - GET /pollutionCities");
    res.send(pollutionCities);
});



//GET a un recurso concreto /station
app.get(BASE_API_PATH+"/pollutionCities/:station",(req,res)=>{
     
    var station = req.params.station;
     console.log(Date() + " - GET /pollutionCities/"+ station);
    var filteredCities = pollutionCities.filter((c)=>{
        return (c.station == station);
    });

   res.send(filteredCities);
});

// POST al conjunto de recursos   
app.post(BASE_API_PATH+"/pollutionCities",(req,res)=>{ 
    console.log(Date() + " - POST /pollutionCities");
    var city = req.body;
    cities.push(city);
     
    res.sendStatus(201);
});

//POST a un recurso
app.post(BASE_API_PATH + "/pollutionCities/:station",(req,res)=>{
    var station = req.params.station;
     console.log(Date() + " - GET /pollutionCities/"+ station);
    res.sendStatus(405);
}); 



//DELETE a un conjunto recursos
app.delete(BASE_API_PATH+"/pollutionCities",(req,res)=>{
    console.log(Date() + " - DELETE /pollutionCities");
    pollutionCities = [];
    res.sendStatus(200);
 });


//DELETE a un recurso concreto
app.delete(BASE_API_PATH+"/pollutionCities/:station",(req,res)=>{
    var station = req.params.station;
    console.log(Date() + " - DELETE /pollutionCities/"+ station);
    pollutionCities = pollutionCities.filter((c)=>{
        return c.station != station;
    });
   res.sendStatus(200);
}); 




//PUT a un conjunto
app.put(BASE_API_PATH+"/pollutionCities",(req,res)=>{
    console.log(Date() + " - PUT /pollutionCities");
    res.sendStatus(405);
});  

//PUT a un recurso concreto
app.put(BASE_API_PATH+"/pollutionCities/:station",(req,res)=>{
    var station = req.params.station;
    var updateCities = req.body;
    
    console.log(Date() + " - PUT /pollutionCities/"+station);
    
    if(station != updateCities.station){
        res.sendStatus(409);
        return;
    }
   
   pollutionCities = pollutionCities.map((c)=>{
       if (c.station == updateCities.station){
           return updateCities;
       }else{
           return c;
       }
   });
    res.sendStatus(200);
});

// -----------ANTONIO-----------

var globalWarmings = [
    
    {"name"  :  "Ciudad-Real",
    "solarPlant" :"Parque-fotovoltaico-Puertollano",
    "year" : 2010
    },
    
     {"name"  :  "Cuenca",
    "solarPlant" :"Parque-fotovoltaico-Olmedilla-de-Alarcon",
     "year" : 2010
     },
    
     {"name"  :  "Caceres",
    "solarPlant" :"Planta-solar-fotovoltaica-La-Magascona-y-La-Magasquilla",
    "year" : 2010     
     },
     
     {"name"  :  "La-Rioja",
    "solarPlant" :"Planta-solar-Arnedo",
    "year" : 2010     
     },
     
      {"name"  :  "Cuenca",
    "solarPlant" :"Planta-solar-Osa-de-la-Vega",
    "year" : 2010    
     }
   
    ];

var db = new DataStore({
    
    Filename: dbFileName,
    autoload: true
    
    });
    
db.find({},(err,iglobalWarmings)=>{
    if(err){
        console.error("Error accesing DB");
        process.exit(1);
    }
    
    if(iglobalWarmings.length == 0){
        console.log("Empty DB");
        db.insert(globalWarmings);
        
    }else{
        console.log("DB initialized with "+iglobalWarmings.length+" globalWarmings");
        
        
    }
    
});    
    
//--------------------------------------------------------------------------------    


app.get(BASE_API_PATH + "/globalWarmings/loadInitialData", function (req, res){
     var inicializacion = [{
    "name"  :  "Cuenca",
    "solarPlant" :"Planta-solar-Osa-de-la-Vega",
    "year" : 2010
    },
    
    {"name"  :  "La-Rioja",
    "solarPlant" :"Planta-solar-Arnedo",
    "year" : 2010     
     }];
    globalWarmings=inicializacion;
        console.log("Initializing data"); 
    
     res.send(globalWarmings);
     res.sendStatus(201);
     console.log("Data initialized");
});
    
//GET al conjunto de recursos    
app.get(BASE_API_PATH+"/globalWarmings",(req,res)=>{
    console.log(Date() + " - GET /globalWarmings");
    res.send(globalWarmings);
});



//GET a un recurso concreto /name_solar_plants
 app.get(BASE_API_PATH+"/globalWarmings/:solarPlant",(req,res)=>{
     
    var solarPlant = req.params.solarPlant;
     console.log(Date() + " - GET /globalWarmings/"+ solarPlant);
    var filteredCities = globalWarmings.filter((c)=>{
        return (c.solarPlant == solarPlant);
});

   res.send(filteredCities);
 });
 
//--------------------------------------------------------------------------------

   
// POST al conjunto de recursos   
app.post(BASE_API_PATH+"/globalWarmings",(req,res)=>{ 
    console.log(Date() + " - POST /globalWarmings");
     var city = req.body;
     globalWarmings.push(city);
     res.sendStatus(201);
    
});


//POST a un recurso
app.post(BASE_API_PATH + "/globalWarmings/:solarPlant",(req,res)=>{
    var solarPlant = req.params.solarPlant;
     console.log(Date() + " - GET /globalWarmings/"+ solarPlant);
    res.sendStatus(405);
}); 

//--------------------------------------------------------------------------------


//DELETE a un conjunto recursos
app.delete(BASE_API_PATH+"/globalWarmings",(req,res)=>{
    console.log(Date() + " - DELETE /globalWarmings");
    globalWarmings = [];
    res.sendStatus(200);
 });


//DELETE a un recurso concreto
app.delete(BASE_API_PATH+"/globalWarmings/:solarPlant",(req,res)=>{
    var solarPlant = req.params.solarPlant;
    console.log(Date() + " - DELETE /globalWarmings/"+ solarPlant);
    globalWarmings = globalWarmings.filter((c)=>{
        return c.solarPlant != solarPlant;
    });
   res.sendStatus(200);
}); 

//--------------------------------------------------------------------------------


//PUT a un conjunto
app.put(BASE_API_PATH+"/globalWarmings",(req,res)=>{
    console.log(Date() + " - PUT /globalWarmings");
    res.sendStatus(405);
});  

//PUT a un recurso concreto
app.put(BASE_API_PATH+"/globalWarmings/:solarPlant",(req,res)=>{
    var solarPlant = req.params.solarPlant;
    var updateCities = req.body;
    
    console.log(Date() + " - PUT /globalWarmings/"+solarPlant);
    
    if(solarPlant != updateCities.solarPlant){
        res.sendStatus(409);
        return;
    }
   
   globalWarmings = globalWarmings.map((c)=>{
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

