/* global angular */
angular
    .module("pollutionApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "menu.html"
            }).when("/station/:station", {
                templateUrl: "edit.html",
                controller: "EditCtrl"
            });

    });