
//IndexLab06

var express = require("express");
var bodyParser = require("body-parser");


var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";

var app = express();
app.use("/",express.static(__dirname+"/public"));
app.use(bodyParser.json());


// -------------ADAN---------------
var cities = [
    
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
    
app.get(BASE_API_PATH + "/cities/loadInitialData", function (req, res){
     var inicializacion = [{"city"  :  "madrid",
    "station" :"fernandez-ladreda-oporto",
    "year" : "2014"
    },
    
     {"city"  :  "barcelona",
    "station" :"l-eixample",
    "year" : "2014"
    }];
    initialCities=inicializacion;
    console.log("Initializing data"); 
    cities.push(initialCities);
    res.send(initialCities);
    res.sendStatus(201);
    console.log("Data initialized");
});    
    
    
//GET al conjunto de recursos    
app.get(BASE_API_PATH+"/cities",(req,res)=>{
    console.log(Date() + " - GET /cities");
    res.send(cities);
});



//GET a un recurso concreto /station
app.get(BASE_API_PATH+"/cities/:station",(req,res)=>{
     
    var station = req.params.station;
     console.log(Date() + " - GET /cities/"+ station);
    var filteredCities = cities.filter((c)=>{
        return (c.station == station);
    });

   res.send(filteredCities);
});

// POST al conjunto de recursos   
app.post(BASE_API_PATH+"/cities",(req,res)=>{ 
    console.log(Date() + " - POST /cities");
    var city = req.body;
    cities.push(city);
     
    res.sendStatus(201);
});

//POST a un recurso
app.post(BASE_API_PATH + "/cities/:station",(req,res)=>{
    var station = req.params.station;
     console.log(Date() + " - GET /cities/"+ station);
    res.sendStatus(405);
}); 



//DELETE a un conjunto recursos
app.delete(BASE_API_PATH+"/cities",(req,res)=>{
    console.log(Date() + " - DELETE /cities");
    cities = [];
    res.sendStatus(200);
 });


//DELETE a un recurso concreto
app.delete(BASE_API_PATH+"/cities/:station",(req,res)=>{
    var station = req.params.station;
    console.log(Date() + " - DELETE /cities/"+ station);
    cities = cities.filter((c)=>{
        return c.station != station;
    });
   res.sendStatus(200);
}); 




//PUT a un conjunto
app.put(BASE_API_PATH+"/cities",(req,res)=>{
    console.log(Date() + " - PUT /cities");
    res.sendStatus(405);
});  

//PUT a un recurso concreto
app.put(BASE_API_PATH+"/cities/:station",(req,res)=>{
    var station = req.params.station;
    var updateCities = req.body;
    
    console.log(Date() + " - PUT /cities/"+station);
    
    if(station != updateCities.station){
        res.sendStatus(409);
        return;
    }
   
   cities = cities.map((c)=>{
       if (c.station == updateCities.station){
           return updateCities;
       }else{
           return c;
       }
   });
    res.sendStatus(200);
});

// -----------ANTONIO-----------

var cities = [
    
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


    
//--------------------------------------------------------------------------------    


app.get(BASE_API_PATH + "/cities/loadInitialData", function (req, res){
     var inicializacion = [{
    "name"  :  "Cuenca",
    "solarPlant" :"Planta-solar-Osa-de-la-Vega",
    "year" : 2010
    },
    
    {"name"  :  "La-Rioja",
    "solarPlant" :"Planta-solar-Arnedo",
    "year" : 2010     
     }];
    initialCities=inicializacion;
        console.log("Initializing data"); 
        cities.push(initialCities);
     res.send(initialCities);
     res.sendStatus(201);
     console.log("Data initialized");
});
    
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
