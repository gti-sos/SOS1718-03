//IndexLab6

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");

console.log("a10");

var MongoClient = require("mongodb").MongoClient;


var globlalWarmingsApi = require("./globlalWarmingsApi/v1");
var globlalWarmingsApi2 = require("./globlalWarmingsApi/v2"); /////////////F05
var pollutionApi = require("./pollutionApi/v1");
var pollutionApi2 = require("./pollutionApi/v2");
var port = (process.env.PORT || 1607);



var mdbURL = "mongodb://adan:adan123@ds141068.mlab.com:41068/sos1718-03";
var mdbURL1 = "mongodb://global:global@ds237489.mlab.com:37489/sos1718-ajpg-sandbox";





var app = express();


app.use("/", express.static(path.join(__dirname + "/public")));
app.use(bodyParser.json());
app.use(cors());


var request = require('request');


app.use("/proxySUS", function(req, res) {
    var url = "https://sos1718-09.herokuapp.com" + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});

app.use("/proxyDAP", function(req, res) {
    var url = "https://sos1718-08.herokuapp.com" + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});
app.use("/proxyMAR", function(req, res) {
    var url = "https://sos1718-04.herokuapp.com" + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});
app.use("/proxyVIC", function(req, res) {
    var url = "https://sos1718-07.herokuapp.com" + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});
app.use("/proxyBUI", function(req, res) {
    var url = "https://sos1718-10.herokuapp.com" + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});
app.use("/proxyUNE", function(req, res) {
    var url = "https://sos1718-02.herokuapp.com" + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});
app.use("/proxyFOO", function(req, res) {
    var url = "https://api.football-data.org" + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});
app.use("/proxyCIT", function(req, res) {
    var url = "https://api.citybik.es" + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});
app.use("/proxyART", function(req, res) {
    var url = "https://api.discogs.com" + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});
app.use("/proxyWAR", function(req, res) {
    var url = "https://swapi.co" + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});
app.use("/proxyTRA", function(req, res) {
    var url = "http://sos1718-01.herokuapp.com" + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});





// -------------ADAN---------------
var initialPollutionCities = [

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


/*var db = new DataStore({
    filename: dbFileNameA,
    autoload: true
});*/



MongoClient.connect(mdbURL, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB" + err);
        process.exit(1);
    }
console.log("a11");

    console.error("Connected to DB");
    var dataBase = mlabs.db("sos1718-03");
    var db = dataBase.collection("pollutionCities");



    db.find({}).toArray((err, pollutionCities) => {
console.log("a12");

        if (pollutionCities.length == 0) {
            console.log("Empty DB");
            db.insert(initialPollutionCities);
        }
        else {
            console.log("DB initialized with " + pollutionCities.length + " pollutionCities");
        }

    });

    pollutionApi.register(app, db); //////////F05
    pollutionApi2.register(app, db);

    app.listen(port, () => {
console.log("a13");

        console.log(" Server ready on port " + port + "!");

    }).on("error", (e) => {
        console.log("Server NOT READY:" + e);
    });
});


/*


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

    {
        "name": "Ciudad-Real",
        "solarPlant": "Parque-fotovoltaico-Puertollano",
        "year": 2010,
        "temperature": 0.7,
        "peakPower": 70
    },

    {
        "name": "Cuenca",
        "solarPlant": "Parque-fotovoltaico-Olmedilla-de-Alarcon",
        "year": 2010,
        "temperature": 0.7,
        "peakPower": 60

    },

    {
        "name": "Caceres",
        "solarPlant": "Planta-solar-fotovoltaica-La-Magascona-y-La-Magasquilla",
        "year": 2010,
        "temperature": 0.7,
        "peakPower": 34.7

    },

    {
        "name": "La-Rioja",
        "solarPlant": "Planta-solar-Arnedo",
        "year": 2010,
        "temperature": 0.7,
        "peakPower": 30

    },

    {
        "name": "Cuenca",
        "solarPlant": "Planta-solar-Osa-de-la-Vega",
        "year": 2010,
        "temperature": 0.7,
        "peakPower": 30

    }
];;

/*    
var db1 = new DataStore({
    filename: dbFileName,
    autoload: true
});*/



MongoClient.connect(mdbURL1, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB" + err);
        process.exit(1);
    }
console.log("a14");

    console.error("Connected to DB");
    var dataBase = mlabs.db("sos1718-ajpg-sandbox");
    var db1 = dataBase.collection("globalWarmings");



    db1.find({}).toArray((err, globalWarmings) => {

        if (globalWarmings.length == 0) {
            console.log("Empty DB");
            db1.insert(initialGlobalWarmings);
        }
        else {
            console.log("a15");

            console.log("DB initialized with " + globalWarmings.length + " globalWarmings");
        }

    });

    globlalWarmingsApi.register(app, db1);
    globlalWarmingsApi2.register(app, db1); //////////F05

    app.listen(port, () => {

        console.log(" Server ready on port " + port + "!");
console.log("a16");

    }).on("error", (e) => {
        console.log("Server NOT READY:" + e);
    });
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
