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
            .when("/victim", {
                templateUrl: "/pollution.1/victim.html" ,
                controller: "victim"
            })    
            .when("/graphGraduation", {
                templateUrl: "/pollution.1/graphGraduation.html ",
                controller: "graphGraduation"
            })
            .when("/graphBuilders", {
                templateUrl: "/pollution.1/graphBuilders.html ",
                controller: "graphBuilders"
            })
            .when("/unemployments", {
                templateUrl: "/pollution.1/unemployments.html" ,
                controller: "unemployments"
            })
            .when("/graphFootball", {
                templateUrl: "/pollution.1/graphFootball.html" ,
                controller: "graphFootball"
            })
            .when("/citybik", {
                templateUrl: "/pollution.1/citybik.html" ,
                controller: "citybik"
            });


    });
    