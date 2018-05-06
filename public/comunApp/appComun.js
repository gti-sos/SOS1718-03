/* global angular */

angular
    .module("appComun", ["ngRoute"])
    .config(function($routeProvider) {
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
                templateUrl: "listGlobal.html",
                controller: "listCtrlGlobal"
            })
            .when("/solarPlant/:solarPlant", {
                templateUrl: "editGlobal.html",
                controller: "editCtrlGlobal"
            });
    });