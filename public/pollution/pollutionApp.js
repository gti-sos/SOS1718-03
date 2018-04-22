/* global angular */
angular
    .module("pollutionApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListCtrl"
            }).when("/station/:station", {
                templateUrl: "edit.html",
                controller: "EditCtrl"
            });

    });