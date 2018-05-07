/* global angular */
var app = angular
    .module("StatsApp", ["ngRoute"]);
app.config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "menu.html"
            })
            .when("/pollution", {
                templateUrl: "listPollution.html",
                controller: "listCtrlPollution"
            })
            .when("/station/:station", {
                templateUrl: "editPollution.html",
                controller: "editCtrlPollution"
            })
            .when("/global", {
                templateUrl: "listGlobal.html ",
                controller: "listCtrlGlobal"
            })
            .when("/solarPlant/:solarPlant", {
                templateUrl: "editGlobal.html",
                controller: "editCtrlGlobal"
            })
            .when("/analytics", {
                templateUrl: "analytics.html"
            })
<<<<<<< HEAD
            .when("/graph1", {
                templateUrl: "graph1.html" ,
                controller: "graph1"

=======
            .when("/graph2", {
                templateUrl: "graph2.html ",
                controller: "graph2"
>>>>>>> c0b7bee6d5b94dd61747e661f29d724df69133cd
            });


    });
    