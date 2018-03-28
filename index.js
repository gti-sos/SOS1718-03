
//IndexLab6

var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");
var globlalWarmingsApi = require("./globlalWarmingsApi"); /////////////F05

var port = (process.env.PORT || 1607);
var dbFileName = __dirname + "/globalwarmings.db";



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
    
app.get(BASE_API_PATH + "/pollution-cities/loadInitialData", function (req, res){
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
app.get(BASE_API_PATH+"/pollution-cities",(req,res)=>{
    console.log(Date() + " - GET /pollution-cities");
    res.send(pollutionCities);
});



//GET a un recurso concreto /station
app.get(BASE_API_PATH+"/pollution-cities/:station",(req,res)=>{
     
    var station = req.params.station;
     console.log(Date() + " - GET /pollution-cities/"+ station);
    var filteredCities = pollutionCities.filter((c)=>{
        return (c.station == station);
    });

   res.send(filteredCities[0]);
});

// POST al conjunto de recursos   
app.post(BASE_API_PATH+"/pollution-cities",(req,res)=>{ 
    console.log(Date() + " - POST /pollution-cities");
    var city = req.body;
    pollutionCities.push(city);
     
    res.sendStatus(201);
});

//POST a un recurso
app.post(BASE_API_PATH + "/pollution-cities/:station",(req,res)=>{
    var station = req.params.station;
     console.log(Date() + " - GET /pollution-cities/"+ station);
    res.sendStatus(405);
}); 



//DELETE a un conjunto recursos
app.delete(BASE_API_PATH+"/pollution-cities",(req,res)=>{
    console.log(Date() + " - DELETE /pollution-cities");
    pollutionCities = [];
    res.sendStatus(200);
 });


//DELETE a un recurso concreto
app.delete(BASE_API_PATH+"/pollution-cities/:station",(req,res)=>{
    var station = req.params.station;
    console.log(Date() + " - DELETE /pollution-cities/"+ station);
    pollutionCities = pollutionCities.filter((c)=>{
        return c.station != station;
    });
   res.sendStatus(200);
}); 




//PUT a un conjunto
app.put(BASE_API_PATH+"/pollution-cities",(req,res)=>{
    console.log(Date() + " - PUT /pollution-cities");
    res.sendStatus(405);
});  

//PUT a un recurso concreto
app.put(BASE_API_PATH+"/pollution-cities/:station",(req,res)=>{
    var station = req.params.station;
    var updateCities = req.body;
    
    console.log(Date() + " - PUT /pollution-cities/"+station);
    
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
   

  var db = new DataStore({
    filename: dbFileName,
    autoload: true
});

globlalWarmingsApi.register(app,db);//////////F05

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


   
app.listen(port,()=>{
    
    console.log(" Server ready on port "+port+"!");
    
}).on("error", (e)=>{
    console.log("Server NOT READY:"+e);
 });