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
            .when("/graph2", {
                templateUrl: "graph2.html ",
                controller: "graph2"
            });


    });
    