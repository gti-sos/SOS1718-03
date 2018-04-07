
//IndexLab6

var express = require("express");
var bodyParser = require("body-parser");

var MongoClient = require("mongodb").MongoClient;

var globlalWarmingsApi = require("./globlalWarmingsApi"); /////////////F05
var pollutionApi =  require("./pollutionApi");
var port = (process.env.PORT || 1607);


var mdbURL = "mongodb://adan:adan123@ds141068.mlab.com:41608/sos1718-03";
var mdbURL1 = "mongodb://global:global@ds237489.mlab.com:37489/sos1718-ajpg-sandbox";





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
    
    
/*var db = new DataStore({
    filename: dbFileNameA,
    autoload: true
});*/

MongoClient.connect(mdbURL,{native_parser:true}, function (err, mlabs) {
    if (err) {
        console.error("Error accesing DB" + err);
        process.exit(1);
    }else{
        console.error("Connected to DB");
        process.exit(1);
    }
});
/*
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
    
*/   
    
  
    
    




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
    
/*    
var db1 = new DataStore({
    filename: dbFileName,
    autoload: true
});
*/

MongoClient.connect(mdbURL1, {native_parser: true}, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB" + err);
        process.exit(1);
    }else{
        console.error("Connected to DB");
    }
});
 
//--------------------------------------------------------------------------------

   
/*
globlalWarmingsApi.register(app,db1);//////////F05

db1.find({}, (err, globalWarmings) => {
    if (err) {
        console.error("Error accesing DB");
        process.exit(1);
    }

    if (globalWarmings.length == 0) {
        console.log("Empty DB");
        db1.insert(initialGlobalWarmings);
    }
    else {
        console.log("DB initialized with " + globalWarmings.length + " globalWarmings");
    }

});  
   */ 

//--------------------------------------------------------------------------------    


  
app.listen(port,()=>{
    
    console.log(" Server ready on port "+port+"!");
    
}).on("error", (e)=>{
    console.log("Server NOT READY:"+e);
});
