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
        var pollutionCities = inicializacion;
        console.log("Initializing data");
        db.insert(pollutionCities);
        res.sendStatus(201);
        console.log("Data initialized");
    });

    app.get(BASE_API_PATH + "/pollution-cities/docs", (req, res) => {

    res.status(301).redirect("https://documenter.getpostman.com/view/4029231/sos1718-03-pollutioncities/RVtynWMv");

});

    //GET al conjunto de recursos    
    app.get(BASE_API_PATH + "/pollution-cities", (req, res) => {
        console.log(Date() + " - GET /pollution-cities");

        db.find({}, (err, pollutionCities) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.send(pollutionCities);
        });

    });

    //GET a un recurso concreto /station
    app.get(BASE_API_PATH + "/pollution-cities/:station", (req, res) => {
        var station = req.params.station;
        console.log(Date() + " - GET /pollution-cities/" + station);

        db.find({}, (err, pollutionCities) => {

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

            res.send(filteredCities[0]);
        });
    });

    // POST al conjunto de recursos   
    app.post(BASE_API_PATH + "/pollution-cities", (req, res) => {
        console.log(Date() + " - POST /pollution-cities");
        var city = req.body;
        if (Object.keys(city).length > 4 ||!city.hasOwnProperty("city")|| !city.hasOwnProperty("station") ||
            !city.hasOwnProperty("year") || !city.hasOwnProperty("_id")){
            res.sendStatus(400);
            return;
        }else{
            db.find({}, (err, pollutionCities) => {

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
        db.find({}, (err, pollutionCities) => {
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

       

        
        
        if (Object.keys(updateCities).length > 4 ||!updateCities.hasOwnProperty("city")|| !updateCities.hasOwnProperty("station") ||
            !updateCities.hasOwnProperty("year") || !updateCities.hasOwnProperty("_id") || station != updateCities.station){
            res.sendStatus(400);
            return;
        }
        
        db.update({ "station": updateCities.station }, updateCities, (err, numUpdated) => {
            console.log("Updated: " + numUpdated);
        });

        res.sendStatus(200);
    });



}
