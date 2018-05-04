
var globalWarmingsApi2 = {};
var BASE_API_PATH = "/api/v2";



module.exports = globalWarmingsApi2;

globalWarmingsApi2.register = function (app,db){
    
    console.log("Registering for globalWarmingsApi2.... ");
    

app.get("/test", function (req, res){
    res.send("test");
});


app.get(BASE_API_PATH + "/global-warmings/loadInitialData", (req, res) =>{
    
     var inicializacion = [ 
    
    {"name"  :  "Ciudad-Real",
    "solarPlant" :"Parque-fotovoltaico-Puertollano",
    "year" : 2010,
    "temperature" : 0.7,
    "peakPower" : 70
    },
    
     {"name"  :  "Cuenca",
    "solarPlant" :"Parque-fotovoltaico-Olmedilla-de-Alarcon",
     "year" : 2010,
     "temperature" : 0.7,
     "peakPower" : 60
    
     },
    
     {"name"  :  "Caceres",
    "solarPlant" :"Planta-solar-fotovoltaica-La-Magascona-y-La-Magasquilla",
    "year" : 2010,
    "temperature" : 0.7,
    "peakPower" : 34.7
         
     },
     
     {"name"  :  "La-Rioja",
    "solarPlant" :"Planta-solar-Arnedo",
    "year" : 2010,
    "temperature" : 0.7,
    "peakPower" : 30
        
     },
     
      {"name"  :  "Cuenca",
    "solarPlant" :"Planta-solar-Osa-de-la-Vega",
    "year" : 2010,
    "temperature" : 0.7,
    "peakPower" : 30
        
     }];
    
    
     db.find({}).toArray((err, globalWarmings)=> {
            
            if (err) {
                res.sendStatus(500);
            }
            else {
              
                if (globalWarmings.length > 0) {
                    res.send('The database has already been initialized: ' + globalWarmings.length + 'elements');
                }
                else {
                    var globalWarmings1 = inicializacion;
                    db.insert(globalWarmings1);
                    res.sendStatus(201); 
                    console.log("DataBase initialized.");
                }
            }
    });
});



 //get al conjunto de todo
    app.get(BASE_API_PATH + "/global-warmings", (req, res) => {
        console.log(Date() + " - GET /global-warmings");
        var url = req.query;
        var limit = parseInt(url.limit);
        var year = parseInt(url.year);
        var name = url.name;
        var solarPlant = url.solarPlant;
        var temperature = url.temperature;
        var peakPower = parseInt(url.peakPower);
        var offset = parseInt(url.offset);
        var from = parseInt(url.from);
        var to = parseInt(url.to);
        var aux2 = [];
        var boolean = false;
        
        if (limit > 0 && offset >= 0) {
            db.find({}).toArray((err, globalWarmings) => {

                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                
                var filteredCities = globalWarmings.filter((c) => {
                    delete c._id;
                    return c;
                });
                
                
                if (year){
                    filteredCities = filteredCities.filter((c) => {
                    return (year == c.year);
                    });
                }else if(name){
                    filteredCities = filteredCities.filter((c) => {
                    return (name == c.name);
                    });
                }else if(temperature){
                    filteredCities = filteredCities.filter((c) => {
                    return (temperature == c.temperature);
                    });
                }else if(peakPower){
                    filteredCities = filteredCities.filter((c) => {
                    return (peakPower == c.peakPower);
                    });
                }else if(from || to){
                    filteredCities = filteredCities.filter((c) => {
                        return (from <= c.year && to >= c.year);
                        
                    });
                }else if(solarPlant){
                    filteredCities = filteredCities.filter((c) => {
                    boolean = true;
                    return (solarPlant == c.solarPlant);
                    });
                }if (boolean == true){
                     if (filteredCities.length > 0) {
                    aux2 = filteredCities.slice(offset, offset + limit);
                    res.send(aux2[0]);
                    }else{
                    res.send("Not found");
                    }
                }else{
                     if (filteredCities.length > 0) {
                    aux2 = filteredCities.slice(offset, offset + limit);
                    res.send(aux2);
                    }else{
                    res.send([]);
                    }
                }
               
                
            });
        }else {
            db.find({}).toArray((err, globalWarmings) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                var filteredCities = globalWarmings.filter((c) => {
                    delete c._id;
                    return c;
                });
                if (year){
                    filteredCities = filteredCities.filter((c) => {
                    return (year == c.year);
                    });
                }else if(name){
                    filteredCities = filteredCities.filter((c) => {
                    return (name == c.name);
                    });
                }else if(temperature){
                    filteredCities = filteredCities.filter((c) => {
                    return (temperature == c.temperature);
                    });
                }else if(peakPower){
                    filteredCities = filteredCities.filter((c) => {
                    return (peakPower == c.peakPower);
                    });
                }else if(from || to){
                    filteredCities = filteredCities.filter((c) => {
                        return(from <= c.year && to >= c.year);
                
                    });
                }else if(solarPlant){
                    filteredCities = filteredCities.filter((c) => {
                    boolean = true;
                    return (solarPlant == c.solarPlant);
                    });
                }
                if(boolean==true){    
                    if (filteredCities.length > 0) {
                        res.send(filteredCities[0]);
                    }else{
                        res.send("Not found");
                    }
                }else{
                    if (filteredCities.length > 0) {
                        res.send(filteredCities);
                    }else{
                        res.send([]);
                    }
                } 
            });
        }
    });

app.get(BASE_API_PATH + "/global-warmings/docs", (req, res) => {

    res.status(301).redirect("https://documenter.getpostman.com/view/4029210/sos1718-03-globalwarmings-heroku/RVu1HWcv");
                                
});

//GET a un recurso concreto /name_solar_plants
 app.get(BASE_API_PATH+"/global-warmings/:solarPlant",(req,res)=>{
     
    var solarPlant = req.params.solarPlant;
    console.log(Date() + " - GET /global-warmings/"+ solarPlant);
     
    db.find({"solarPlant": solarPlant}).toArray((err, globalWarmings) => {

            var filteredCities = globalWarmings.filter((c) => {
                return (c.solarPlant == solarPlant);
            });

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (filteredCities.length==0){
                res.sendStatus(404);
            }
            
            res.send(filteredCities.map((c) => {
                delete c._id;
                return c;
            })[0]);

        });
 });
     
 
//--------------------------------------------------------------------------------

   
 // POST al conjunto de recursos   
    app.post(BASE_API_PATH + "/global-warmings", (req, res) => {
        console.log(Date() + " - POST /global-warmings");
        var city = req.body;
        if (Object.keys(city).length > 5 ||!city.hasOwnProperty("name")|| !city.hasOwnProperty("solarPlant") ||
            !city.hasOwnProperty("year") || !city.hasOwnProperty("temperature") || !city.hasOwnProperty("peakPower")){
            res.sendStatus(400);
            return;
        }else{
            db.find({}).toArray((err, globalWarmings) => {

            var filteredCities = globalWarmings.filter((c) => {
                return (c.solarPlant == city.solarPlant);
            });

            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (filteredCities.length==0){
                db.insert(city);
                res.sendStatus(201);
            }else{
                res.sendStatus(409);
            }
            });
           
        }
        
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
    db.find({}).toArray((err, globalWarmings) => {
       if(err){
                console.error("Error accesing to db");
                res.sendStatus(500);
                return;
            }else{
                db.remove({});
                res.sendStatus(200);
            }
        });
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
    app.put(BASE_API_PATH + "/global-warmings/:solarPlant", (req, res) => {
        var solarPlant = req.params.solarPlant;
        var updateCities = req.body;

        console.log(Date() + " - PUT /global-warmings/" + solarPlant);

        
        if (Object.keys(updateCities).length > 5 ||!updateCities.hasOwnProperty("name")|| !updateCities.hasOwnProperty("solarPlant") ||
            !updateCities.hasOwnProperty("year") || !updateCities.hasOwnProperty("temperature") || !updateCities.hasOwnProperty("peakPower") ||
            solarPlant != updateCities.solarPlant){
            res.sendStatus(400);
            return;
               }
        
        db.update({ "solarPlant": updateCities.solarPlant }, updateCities, (err, numUpdated) => {
            console.log("Updated: " + numUpdated);
        });

        res.sendStatus(200);
    });


};