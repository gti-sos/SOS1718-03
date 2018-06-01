var pollutionApi = {};
var BASE_API_PATH = "/api/v1";
module.exports = pollutionApi;

pollutionApi.register = function(app, db) {

    console.log("Registering for pollutionApi...");
    //loadInitialData
    app.get(BASE_API_PATH + "/pollution-cities/loadInitialData", function(req, res) {
        var inicializacion = [

            {
                "city": "madrid",
                "station": "fernandez-ladreda-oporto",
                "year": "2014",
                "car": "3256265",
                "nitrous": "53"
            },

            {
                "city": "barcelona",
                "station": "l-eixample",
                "year": "2014",
                "car": "2347766",
                "nitrous": "52"
            },

            {
                "city": "barcelona",
                "station": "gracia-sant-gervasi",
                "year": "2014",
                "car": "2347766",
                "nitrous": "52"
            },

            {
                "city": "madrid",
                "station": "escuelas-aguirre",
                "year": "2014",
                "car": "3256265",
                "nitrous": "53"
            },

            {
                "city": "valencia",
                "station": "pista-de-silla",
                "year": "2014",
                "car": "170977",
                "nitrous": "46"
            }

        ];
               
             
        db.find({}).toArray((err, pollutionCities)=> {
            
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
    
   //get al conjunto de todo
    app.get(BASE_API_PATH + "/pollution-cities", (req, res) => {
        console.log(Date() + " - GET /pollution-cities");
        
        
        var url = req.query;
        var car = url.car;
        var from = parseInt(url.from);
        var to = parseInt(url.to);
        var nitrous = url.nitrous;
        var limit = parseInt(url.limit);
        var year = parseInt(url.year);
        var city = url.city;
        var offset = parseInt(url.offset);
        var aux2 = [];
        var boolean = false;
        var station = url.station;
        
        
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
                
                
                if (year){
                    filteredCities = filteredCities.filter((c) => {
                    return (year == c.year);
                    });
                }else if(city){
                    filteredCities = filteredCities.filter((c) => {
                    return (city == c.city);
                    });
                }else if(car){
                    filteredCities = filteredCities.filter((c) => {
                    return (car == c.car);
                    });
                }else if(nitrous){
                    filteredCities = filteredCities.filter((c) => {
                    return (nitrous == c.nitrous);
                    });
                }else if(from || to){
                    filteredCities = filteredCities.filter((c) => {
                    return (from <= c.year && to >= c.year);
                    });
                }else if(station){
                    filteredCities = filteredCities.filter((c) => {
                    boolean = true;
                    return (station == c.station);
                    });
                }if (boolean == true){
                     if (filteredCities.length > 0) {
                    aux2 = filteredCities.slice(offset, offset + limit);
                    res.send(aux2[0]);
                    }else{
                    res.send([]);
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
                if (year){
                    filteredCities = filteredCities.filter((c) => {
                    return (year == c.year);
                    });
                }else if(city){
                    filteredCities = filteredCities.filter((c) => {
                    return (city == c.city);
                    });
                }else if(car){
                    filteredCities = filteredCities.filter((c) => {
                    return (car == c.car);
                    });
                }else if(nitrous){
                    filteredCities = filteredCities.filter((c) => {
                    return (nitrous == c.nitrous);
                    });
                }else if(from || to){
                    filteredCities = filteredCities.filter((c) => {
                    return (from <= c.year && to >= c.year);
                    });
                }else if(station){
                    filteredCities = filteredCities.filter((c) => {
                    boolean = true;
                    return (station == c.station);
                    });
                }
                if(boolean==true){    
                    if (filteredCities.length > 0) {
                        res.send(filteredCities[0]);
                    }else{
                        res.send([]);
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
        if (Object.keys(city).length > 5 ||!city.hasOwnProperty("city")|| !city.hasOwnProperty("station") ||
            !city.hasOwnProperty("year")||
            !city.hasOwnProperty("car")||
            !city.hasOwnProperty("nitrous")){
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

       

        
        
        if (Object.keys(updateCities).length > 5 ||!updateCities.hasOwnProperty("city")|| !updateCities.hasOwnProperty("station") ||
            !updateCities.hasOwnProperty("year") || station != updateCities.station ||
            !updateCities.hasOwnProperty("car")||
            !updateCities.hasOwnProperty("nitrous")){
            res.sendStatus(400);
            return;
        }
        
        db.update({ "station": updateCities.station }, updateCities, (err, numUpdated) => {
            console.log("Updated: " + numUpdated);
        });

        res.sendStatus(200);
    });



}
