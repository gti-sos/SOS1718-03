
var globalWarmingsApi = {};
var BASE_API_PATH = "/api/v1";

module.exports = globalWarmingsApi;

globalWarmingsApi.register = function (app,db){
    
    console.log("Registering for globalWarmingsApi.... ");
    

app.get("/test", function (req, res){
    res.send("test");
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
   
   

}