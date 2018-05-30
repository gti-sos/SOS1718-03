/* global angular */
var app = angular
    .module("StatsApp", ["ngRoute"]);
app.config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home.html"
            })
            .when("/pollution", {
                templateUrl: "/pollution.1/listPollution.html",
                controller: "listCtrlPollution"
            })
            .when("/station/:station", {
                templateUrl: "/pollution.1/editPollution.html",
                controller: "editCtrlPollution"
            })
            .when("/global", {
                templateUrl: "/pollution.1/listGlobal.html ",
                controller: "listCtrlGlobal"
            })
            .when("/solarPlant/:solarPlant", {
                templateUrl: "/pollution.1/editGlobal.html",
                controller: "editCtrlGlobal"
            })
            .when("/analytics", {
                templateUrl: "/pollution.1/analytics.html"
            })
            .when("/indexApiAntonio", {
                templateUrl: "/pollution.1/compartida.html",
                controller: "compartidaCtrl"
            })
            .when("/indexApiAntonioPro", {
                templateUrl: "/pollution.1/compartida1.html",
                controller: "compartidaCtrl1"
            })
            .when("/indexApiAdan", {
                templateUrl: "/pollution.1/compartidaG.html",
                controller: "compartidaCtrlG"
            })
            .when("/indexApiAdanPro", {
                templateUrl: "/pollution.1/compartidaG1.html",
                controller: "compartidaCtrlG1"
            })
            .when("/graph1", {
                templateUrl: "/pollution.1/graph1.html" ,
                controller: "graph1"
            })

            .when("/analytics/graph2", {
                templateUrl: "/pollution.1/graph2.html ",
                controller: "graph2"
            })
            .when("/graphp", {
                templateUrl: "/pollution.1/prueba.html" ,
                controller: "prueba"
            })    
            .when("/graphGraduation", {
                templateUrl: "/pollution.1/graphGraduation.html ",
                controller: "graphGraduation"
            });
            

    });
    