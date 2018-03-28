
//IndexLab6

var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");
var globlalWarmingsApi = require("./globlalWarmingsApi"); /////////////F05

var pollutionApi =  require("./pollutionApi");
var port = (process.env.PORT || 1607);
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
   

 
//--------------------------------------------------------------------------------
=======
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
