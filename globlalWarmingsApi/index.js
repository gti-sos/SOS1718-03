
var globalWarmingsApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = globalWarmingsApi;

globalWarmingsApi.register = function (app,db){
    
    console.log("Registering for globalWarmingsApi.... ");
    

app.get("/test", function (req, res){
    res.send("test");
});


app.get(BASE_API_PATH + "/global-warmings/loadInitialData", function (req, res){
    
     var inicializacion = [ 
    
    {"name"  :  "Ciudad-Real",
    "solarPlant" :"Parque-fotovoltaico-Puertollano",
    "year" : 2010,
    
    },
    
     {"name"  :  "Cuenca",
    "solarPlant" :"Parque-fotovoltaico-Olmedilla-de-Alarcon",
     "year" : 2010,
    
     },
    
     {"name"  :  "Caceres",
    "solarPlant" :"Planta-solar-fotovoltaica-La-Magascona-y-La-Magasquilla",
    "year" : 2010,
         
     },
     
     {"name"  :  "La-Rioja",
    "solarPlant" :"Planta-solar-Arnedo",
    "year" : 2010,
        
     },
     
      {"name"  :  "Cuenca",
    "solarPlant" :"Planta-solar-Osa-de-la-Vega",
    "year" : 2010,
        
     }];
    
    
     db.find({},(err, globalWarmings)=> {
            
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



//GET al conjunto de recursos    
app.get(BASE_API_PATH+"/global-warmings",(req,res)=>{
    console.log(Date() + " - GET /global-warmings");
   
   
   
    db.find({}).toArray((err, globalWarmings) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }

        res.send(globalWarmings.map((c) => {
            delete c._id;
            return c;
        }));
    });

});

app.get(BASE_API_PATH + "/global-warmings/docs", (req, res) => {

    res.status(301).redirect("https://documenter.getpostman.com/view/4029210/sos1718-03-globalwarmings-heroku/RVu1HWcv");
                                
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
    
     if (filteredCities.length==0){
                res.sendStatus(404);
            }

   res.send(filteredCities[0]);
        
    });
 });
     
 
//--------------------------------------------------------------------------------

   
 // POST al conjunto de recursos   
    app.post(BASE_API_PATH + "/global-warmings", (req, res) => {
        console.log(Date() + " - POST /global-warmings");
        var city = req.body;
        if (Object.keys(city).length > 4 ||!city.hasOwnProperty("name")|| !city.hasOwnProperty("solarPlant") ||
            !city.hasOwnProperty("year") || !city.hasOwnProperty("_id")){
            res.sendStatus(400);
            return;
        }else{
            db.find({}, (err, globalWarmings) => {

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
    app.put(BASE_API_PATH + "/global-warmings/:solarPlant", (req, res) => {
        var solarPlant = req.params.solarPlant;
        var updateCities = req.body;

        console.log(Date() + " - PUT /global-warmings/" + solarPlant);

        
        if (Object.keys(updateCities).length > 4 ||!updateCities.hasOwnProperty("name")|| !updateCities.hasOwnProperty("solarPlant") ||
            !updateCities.hasOwnProperty("year") || !updateCities.hasOwnProperty("_id")|| solarPlant != updateCities.solarPlant){
            res.sendStatus(400);
            return;
               }
        
        db.update({ "solarPlant": updateCities.solarPlant }, updateCities, (err, numUpdated) => {
            console.log("Updated: " + numUpdated);
        });

        res.sendStatus(200);
    });
   
   

}