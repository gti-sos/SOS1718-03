
//IndexLab6

var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");

var pollutionApi =  require("./pollutionApi");
var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
var dbFileName = __dirname + "/globalwarmings.db";
var dbFileNameA = __dirname + "/pollutionCities.db";



var app = express();
app.use("/",express.static(__dirname+"/public"));
app.use(bodyParser.json());


// -------------ADAN---------------
var initialPollutionCities = [
    
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
    
    
var db = new DataStore({
    filename: dbFileNameA,
    autoload: true
});

pollutionApi.register(app,db);

db.find({}, (err, pollutionCities) => {
    if (err) {
        console.error("Error accesing DB");
        process.exit(1);
    }

    if (pollutionCities.length == 0) {
        console.log("Empty DB");
        db.insert(initialPollutionCities);
    }
    else {
        console.log("DB initialized with " + pollutionCities.length + " pollutionCities");
    }

});  
    
    
    
app.get(BASE_API_PATH + "/pollution-cities/loadInitialData", function (req, res){
     var inicializacion =[
    
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
    initialPollutionCities=inicializacion;
    console.log("Initializing data"); 
    res.send(initialPollutionCities);
    res.sendStatus(201);
    console.log("Data initialized");
});    
    
    



/*
// -----------ANTONIO-----------

var initialGlobalWarmings = [
    
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
    filename: dbFileName,
    autoload: true
});

db.find({}, (err, globalWarmings) => {
    if (err) {
        console.error("Error accesing DB");
        process.exit(1);
    }

    if (globalWarmings.length == 0) {
        console.log("Empty DB");
        db.insert(initialGlobalWarmings);
    }
    else {
        console.log("DB initialized with " + globalWarmings.length + " globalWarmings");
    }

});  
    
//--------------------------------------------------------------------------------    



app.get("/test", function (req, res){
    res.send("test");
});

app.get(BASE_API_PATH + "/global-warmings/loadInitialData", function (req, res){
     var inicializacion = [ {"name"  :  "Ciudad-Real",
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
     }];
    globalWarmings=inicializacion;
        console.log("Initializing data"); 
    
     res.send(globalWarmings);
     res.sendStatus(201);
     console.log("Data initialized");
});
    
//GET al conjunto de recursos    
app.get(BASE_API_PATH+"/global-warmings",(req,res)=>{
    console.log(Date() + " - GET /global-warmings");
   
    db.find({}, (err, globalWarmings) => {
    if (err) {
        console.error("Error accesing DB");
        res.sendStatus(500);
         return;
    }
   
    res.send(globalWarmings);
    });
});


//GET a un recurso concreto /name_solar_plants
 app.get(BASE_API_PATH+"/global-warmings/:solarPlant",(req,res)=>{
     
    var solarPlant = req.params.solarPlant;
    console.log(Date() + " - GET /global-warmings/"+ solarPlant);
     
    db.find({}, (err, globalWarmings) => {
   
    var filteredCities = globalWarmings.filter((c)=>{
        return (c.solarPlant == solarPlant);
    });

    if (err) {
            console.error(" Error accesing DB");
            res.sendStatus(500);
            return;
        }

   res.send(filteredCities[0]);
        
    });
 });
     
 
//--------------------------------------------------------------------------------

   
// POST al conjunto de recursos   
app.post(BASE_API_PATH+"/global-warmings",(req,res)=>{ 
    console.log(Date() + " - POST /global-warmings");
     var city = req.body;
     db.insert(city);
     res.sendStatus(201);
    
});


//POST a un recurso
app.post(BASE_API_PATH + "/global-warmings/:solarPlant",(req,res)=>{
    var solarPlant = req.params.solarPlant;
     console.log(Date() + " - GET /global-warmings/"+ solarPlant);
    res.sendStatus(405);
}); 

//--------------------------------------------------------------------------------


//DELETE a un conjunto recursos
app.delete(BASE_API_PATH+"/global-warmings",(req,res)=>{
    console.log(Date() + " - DELETE /global-warmings");
    db.find({}, (err, globalWarmings) => {
        for (var i = 0; i < globalWarmings.length; i++) {
            db.remove({});
        }
    });
    
    res.sendStatus(200);
 });


//DELETE a un recurso concreto
app.delete(BASE_API_PATH+"/global-warmings/:solarPlant",(req,res)=>{
    var solarPlant = req.params.solarPlant;
    console.log(Date() + " - DELETE /global-warmings/"+ solarPlant);
    
    db.remove({solarPlant: solarPlant});
    
    
   res.sendStatus(200);
}); 

//--------------------------------------------------------------------------------


//PUT a un conjunto
app.put(BASE_API_PATH+"/global-warmings",(req,res)=>{
    console.log(Date() + " - PUT /global-warmings");
    res.sendStatus(405);
});  

//PUT a un recurso concreto
app.put(BASE_API_PATH+"/global-warmings/:solarPlant",(req,res)=>{
    var solarPlant = req.params.solarPlant;
    var updateCities = req.body;
    
    console.log(Date() + " - PUT /global-warmings/"+solarPlant);
    
    if(solarPlant != updateCities.solarPlant){
        res.sendStatus(409);
        console.warn(Date() + "  - Hacking attemp!");
        return;
    }
   
    db.update({"solarPlant": solarPlant}, updateCities, (err,numUpdated)=>{
        console.log("Udapted: "+numUpdated);
    });
   
    res.sendStatus(200);
});
   
*/

   
app.listen(port,()=>{
    
    console.log(" Server ready on port "+port+"!");
    
}).on("error", (e)=>{
    console.log("Server NOT READY:"+e);
});
