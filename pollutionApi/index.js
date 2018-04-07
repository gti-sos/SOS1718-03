var pollutionApi = {};
var BASE_API_PATH = "/api/v1";
module.exports = pollutionApi;

pollutionApi.register = function(app, db) {

    console.log("Registering for index...");

    app.get(BASE_API_PATH + "/pollution-cities/loadInitialData", function(req, res) {
        var inicializacion = [

            {
                "city": "madrid",
                "station": "fernandez-ladreda-oporto",
                "year": "2014"
            },

            {
                "city": "barcelona",
                "station": "l-eixample",
                "year": "2014"
            },

            {
                "city": "barcelona",
                "station": "gracia-sant-gervasi",
                "year": "2014"
            },

            {
                "city": "madrid",
                "station": "escuelas-aguirre",
                "year": "2014"
            },

            {
                "city": "valencia",
                "station": "pista-de-silla",
                "year": "2014"
            }

        ];
               
             
        db.find({},(err, pollutionCities)=> {
            
            if (err) {
                res.sendStatus(500);
            }
            else {
              
                if (pollutionCities.length > 0) {
                    res.send('The database has already been initialized: ' + pollutionCities.length + 'elements');
                }
                else {
                    var pollutionCities1 = inicializacion;
                    db.insert(pollutionCities1);
                    res.sendStatus(201); 
                    console.log("DataBase initialized.");
                }
            }
        });
    });
    
   
    app.get(BASE_API_PATH + "/pollution-cities", (req, res) => {
        console.log(Date() + " - GET /pollution-cities");
        var url = req.query;
        var limit = parseInt(url.limit);
        var offset = parseInt(url.offset);
        var aux2 = [];
        if (limit > 0 && offset >= 0) {
            db.find({}).toArray((err, pollutionCities) => {

                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                
                var filteredCities = pollutionCities.filter((c) => {
                    delete c._id;
                    return c;
                });
                
                if (filteredCities.length > 0) {
                    aux2 = filteredCities.slice(offset, offset + limit);
                        res.send(aux2);
                }
                
            });
        }else {
            db.find({}).toArray((err, pollutionCities) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                
                res.send(pollutionCities.map((c) => {
                    delete c._id;
                    return c;
                }));
            });
        }
    });

    //GET a un recurso concreto /station
    app.get(BASE_API_PATH + "/pollution-cities/:station", (req, res) => {
        var station = req.params.station;
        console.log(Date() + " - GET /pollution-cities/" + station);

        db.find({"station": station}).toArray((err, pollutionCities) => {

            var filteredCities = pollutionCities.filter((c) => {
                return (c.station == station);
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

    // POST al conjunto de recursos   
    app.post(BASE_API_PATH + "/pollution-cities", (req, res) => {
        console.log(Date() + " - POST /pollution-cities");
        var city = req.body;
        if (Object.keys(city).length > 3 ||!city.hasOwnProperty("city")|| !city.hasOwnProperty("station") ||
            !city.hasOwnProperty("year")){
            res.sendStatus(400);
            return;
        }else{
            db.find({}).toArray((err, pollutionCities) => {

            var filteredCities = pollutionCities.filter((c) => {
                return (c.station == city.station);
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
    app.post(BASE_API_PATH + "/pollution-cities/:station", (req, res) => {
        var station = req.params.station;
        console.log(Date() + " - GET /pollution-cities/" + station);
        res.sendStatus(405);
    });



    //DELETE a un conjunto recursos
    app.delete(BASE_API_PATH + "/pollution-cities", (req, res) => {
        console.log(Date() + " - DELETE /pollution-cities");
        db.find({}).toArray((err, pollutionCities) => {
            for (var i = 0; i < pollutionCities.length; i++) {
                db.remove({});
            }
        });
        res.sendStatus(200);
    });


    //DELETE a un recurso concreto
    app.delete(BASE_API_PATH + "/pollution-cities/:station", (req, res) => {
        var station = req.params.station;
        console.log(Date() + " - DELETE /pollution-cities/" + station);
        db.remove({ station: station });
        res.sendStatus(200);
    });




    //PUT a un conjunto
    app.put(BASE_API_PATH + "/pollution-cities", (req, res) => {
        console.log(Date() + " - PUT /pollution-cities");
        res.sendStatus(405);
    });

    //PUT a un recurso concreto
    app.put(BASE_API_PATH + "/pollution-cities/:station", (req, res) => {
        var station = req.params.station;
        var updateCities = req.body;

        console.log(Date() + " - PUT /pollution-cities/" + station);

       

        
        
        if (Object.keys(updateCities).length > 3 ||!updateCities.hasOwnProperty("city")|| !updateCities.hasOwnProperty("station") ||
            !updateCities.hasOwnProperty("year") || station != updateCities.station){
            res.sendStatus(400);
            return;
        }
        
        db.update({ "station": updateCities.station }, updateCities, (err, numUpdated) => {
            console.log("Updated: " + numUpdated);
        });

        res.sendStatus(200);
    });



}
